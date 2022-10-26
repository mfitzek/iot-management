import { IAttribute, IDeviceListRow, IDeviceService } from '@iot/device';
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
    //TODO: await this.updateDeviceAttributes(data);
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

  private async updateDeviceAttributes(data: IDevice) {
    const attributes = await this.prisma.attribute.findMany({
      where: {
        deviceId: data.id,
      },
      select: {
        id: true,
      },
    });

    const attrToUpdate = data.attributes.filter((attr) => attr.id);
    const attrToCreate = data.attributes.filter((attr) => !attr.id);
    const attrToDelete = attributes.filter(
      (attr) => data.attributes.some((id) => id === attr) == false
    );
    const promises: Promise<any>[] = [];
    promises.push(
      ...attrToUpdate.map((attr) => this.updateAttribute(attr.id, attr))
    );
    promises.push(
      ...attrToCreate.map((attr) =>
        this.createAttribute({
          id: null,
          name: attr.name,
          type: attr.type,
          userId: data.owner_id,
          deviceId: data.id,
        })
      )
    );
    await Promise.all(promises);
  }

  private async createAttribute(attribute: Attribute): Promise<Attribute> {
    return await this.prisma.attribute.create({
      data: attribute,
    });
  }

  private async updateAttribute(
    id: string,
    attribute: IAttribute
  ): Promise<Attribute> {
    return await this.prisma.attribute.update({
      where: { id: id },
      data: attribute,
    });
  }

  private async delete(id: string): Promise<boolean> {
    const deleted = await this.prisma.attribute.delete({ where: { id: id } });
    return deleted != null;
  }
}
