import { IDeviceListRow } from '@iot/device';
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
export class DeviceService {
  constructor(private prisma: PrismaService) {}

  async getDeviceList(user_id: string): Promise<IDeviceListRow[]> {
    const devices = await this.prisma.device.findMany({
      where: {
        userId: user_id,
      },
    });

    return devices.map((device) => {
      const row: IDeviceListRow = {
        id: device.id,
        name: device.name,
        type: device.type,
        last_data: new Date().toLocaleString(),
        status: 'online',
      };
      return row;
    });
  }

  async getAllDevices(): Promise<IDevice[]> {
    const data = await this.prisma.device.findMany({
      include: {
        Attribute: true,
        KeyValue: true,
      },
    });
    return data.map((device): IDevice => this.parseToIDevice(device));
  }

  async createDevice(data: ICreateDeviceData) {
    const device = await this.prisma.device.create({
      data: {
        userId: data.user_id,
        name: data.name,
        type: data.type,
      },
    });
    return device;
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

  parseToIDevice(device: DeviceInclude): IDevice {
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
