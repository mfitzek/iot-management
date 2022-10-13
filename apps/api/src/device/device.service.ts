import { IDeviceListRow } from '@iot/device';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IDevice } from '@iot/device';

export interface ICreateDeviceData {
  user_id: string;
  name: string;
  type: string;
}

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
    });

    if (!dev) return null;

    return {
      id: dev.id,
      name: dev.name,
      type: dev.type,
      owner_id: dev.userId,
      attributes: [],
      keyValues: {},
    };
  }
}
