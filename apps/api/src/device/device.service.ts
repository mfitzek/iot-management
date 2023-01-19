import {
  CreateAttribute,
  CreateUserDevice,
  DeviceData,
  IDeviceService,
  UpdateAttribute,
  UpdateDevice,
} from '@iot/device';
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
  async updateDevice(id: string, data: UpdateDevice): Promise<DeviceData | null> {
    const deviceBatch = this.prisma.device.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
      },
      include: {
        Attribute: true,
        KeyValue: true,
      },
    });
    const attributesBatch = data.attributes ? this.updateDeviceAttributes(data) : [];
    const keyValuesBatch = data.keyValues ? this.updateDeviceKeyValues(data) : [];

    const batch = await this.prisma.$transaction([
      deviceBatch,
      ...attributesBatch,
      ...keyValuesBatch,
    ]);
    const device = batch[0];

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

  private updateDeviceAttributes(device: UpdateDevice) {
    const attrToUpdate = device.attributes.update.map((attr) =>
      this.updateAttribute(attr.id, attr)
    );

    const attrToCreate = device.attributes.create.map((attr) =>
      this.createAttribute(device.id, attr)
    );

    const attrToDelete = device.attributes.remove.map((attr) => attr.id);

    const deleteAttributes = this.prisma.attribute.deleteMany({
      where: {
        id: {
          in: attrToDelete,
        },
      },
    });

    return [deleteAttributes, ...attrToCreate, ...attrToUpdate];
  }

  private updateDeviceKeyValues(device: UpdateDevice) {
    return device.keyValues.map((kv) => {
      const { key, value } = kv;
      const id = `${device.id}-${key}`;
      return this.prisma.keyValue.upsert({
        where: {
          id: id,
        },
        create: {
          id: id,
          key: key,
          value: value,
          deviceId: device.id,
        },
        update: {
          key: key,
          value: value,
        },
      });
    });
  }

  private createAttribute(device_id: string, attribute: CreateAttribute) {
    return this.prisma.attribute.create({
      data: {
        name: attribute.name,
        type: attribute.type,
        deviceId: device_id,
      },
    });
  }

  private updateAttribute(id: string, attribute: UpdateAttribute) {
    return this.prisma.attribute.update({
      where: { id: id },
      data: attribute,
    });
  }
}
