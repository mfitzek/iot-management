import { IAttribute, IDevice, IDeviceService } from '@iot/device';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export interface ICreateDeviceData {
  user_id: string;
  name: string;
  type: string;
}

type DeviceInclude = Prisma.DeviceGetPayload<{
  include: {
    Attribute: true;
    KeyValue: true;
  };
}>;

@Injectable()
export class DeviceService implements IDeviceService {
  constructor(private prisma: PrismaService) {}

  async createDevice(data: IDevice): Promise<IDevice> {
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
  async updateDevice(id: string, data: IDevice): Promise<IDevice | null> {
    this.updateDeviceAttributes(data);
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

  async getDeviceList(): Promise<IDevice[]> {
    const devices = await this.prisma.device.findMany({
      include: {
        Attribute: true,
        KeyValue: true,
      },
    });
    return devices.map((device) => this.parseToIDevice(device));
  }

  async getDevice(device_id: string): Promise<IDevice | null> {
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

  private parseToIDevice(device: DeviceInclude): IDevice {
    return {
      id: device.id,
      name: device.name,
      type: device.type,
      owner_id: device.userId,
      attributes: device.Attribute,
      keyValues: device.KeyValue,
    };
  }

  private updateDeviceAttributes(data: IDevice) {
    const attrToUpdate = data.attributes
      .filter((attr) => attr.id != null && attr.to_be_deleted == null)
      .map((attr) => this.updateAttribute(attr.id, attr));

    const attrToCreate = data.attributes
      .filter((attr) => attr.id == null)
      .map((attr) => this.createAttribute(data.owner_id, data.id, attr));

    const attrToDelete = data.attributes
      .filter((attr) => attr.to_be_deleted === true)
      .map((attr) => attr.id);

    const deleteAttributes = this.prisma.attribute.deleteMany({
      where: {
        id: {
          in: attrToDelete,
        },
      },
    });

    return this.prisma.$transaction([
      deleteAttributes,
      ...attrToCreate,
      ...attrToUpdate,
    ]);
  }

  private createAttribute(
    user_id: string,
    device_id: string,
    attribute: IAttribute
  ) {
    return this.prisma.attribute.create({
      data: {
        name: attribute.name,
        type: attribute.type,
        userId: user_id,
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
