import { IDeviceListRow, IDeviceService } from '@iot/device';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IDevice } from '@iot/device';
import { Attribute, Device, Prisma } from '@prisma/client';

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
  removeDevice(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
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
}
