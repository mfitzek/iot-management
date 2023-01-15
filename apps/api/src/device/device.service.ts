import { IAttribute, DeviceData, IDeviceService, CreateUserDevice } from '@iot/device';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type DeviceInclude = Prisma.DeviceGetPayload<{
  include: {
    Attribute: true;
    KeyValue: true;
  };
}>;

@Injectable()
export class DeviceService implements IDeviceService {
  constructor(private prisma: PrismaService) {}

  async createDevice(data: CreateUserDevice): Promise<DeviceData> {
    const device = await this.prisma.device.create({
      data: {
        name: data.name,
        type: data.type,
        userId: data.owner_id,
      },
      include: {
        Attribute: true,
        KeyValue: true,
      },
    });

    return this.parseToIDevice(device);
  }
  async updateDevice(id: string, data: DeviceData): Promise<DeviceData | null> {
    await this.updateDeviceAttributes(data);
    await this.updateDeviceKeyValues(data);
    const device = await this.prisma.device.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        type: data.type,
        userId: data.owner_id,
      },
      include: {
        Attribute: true,
        KeyValue: true,
      },
    });

    if (device) return this.parseToIDevice(device);
    return null;
  }
  async removeDevice(id: string): Promise<boolean> {
    const device = await this.prisma.device.delete({
      where: {
        id: id,
      },
    });

    return device != null;
  }

  async getDeviceList(): Promise<DeviceData[]> {
    const devices = await this.prisma.device.findMany({
      include: {
        Attribute: true,
        KeyValue: true,
      },
    });
    return devices.map((device) => this.parseToIDevice(device));
  }

  async getDevice(device_id: string): Promise<DeviceData | null> {
    const dev = await this.prisma.device.findFirst({
      where: { id: device_id },
      include: {
        Attribute: true,
        KeyValue: true,
      },
    });

    if (!dev) return null;

    return this.parseToIDevice(dev);
  }

  private parseToIDevice(device: DeviceInclude): DeviceData {
    return {
      id: device.id,
      name: device.name,
      type: device.type,
      owner_id: device.userId,
      attributes: device.Attribute,
      keyValues: device.KeyValue,
    };
  }

  private updateDeviceAttributes(device: DeviceData) {
    const attrToUpdate = device.attributes
      .filter((attr) => attr.id != null && attr.to_be_deleted == null)
      .map((attr) => this.updateAttribute(attr.id, attr));

    const attrToCreate = device.attributes
      .filter((attr) => attr.id == null)
      .map((attr) => this.createAttribute(device.id, attr));

    const attrToDelete = device.attributes
      .filter((attr) => attr.to_be_deleted === true)
      .map((attr) => attr.id);

    const deleteAttributes = this.prisma.attribute.deleteMany({
      where: {
        id: {
          in: attrToDelete,
        },
      },
    });

    return this.prisma.$transaction([deleteAttributes, ...attrToCreate, ...attrToUpdate]);
  }

  private async updateDeviceKeyValues(device: DeviceData) {
    const toUpsert = device.keyValues
      .filter((kv) => kv.to_be_deleted == null)
      .map((kv) =>
        this.prisma.keyValue.upsert({
          where: {
            id: kv.id ?? '',
          },
          create: {
            key: kv.key,
            value: kv.value,
            deviceId: device.id,
          },
          update: {
            key: kv.key,
            value: kv.value,
          },
        })
      );

    const toDelete = device.keyValues
      .filter((kv) => kv.to_be_deleted === true)
      .map((kv) =>
        this.prisma.keyValue.delete({
          where: {
            id: kv.id,
          },
        })
      );

    await this.prisma.$transaction([...toUpsert, ...toDelete]);
  }

  private createAttribute(device_id: string, attribute: IAttribute) {
    return this.prisma.attribute.create({
      data: {
        name: attribute.name,
        type: attribute.type,
        deviceId: device_id,
      },
    });
  }

  private updateAttribute(id: string, attribute: IAttribute) {
    return this.prisma.attribute.update({
      where: { id: id },
      data: attribute,
    });
  }
}
