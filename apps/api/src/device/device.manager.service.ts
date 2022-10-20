import { Injectable } from '@nestjs/common';
import { DeviceService } from './device.service';
import { Device } from '@iot/device';

@Injectable()
export class DeviceManager {
  device_list: Device[] = [];

  constructor(private devices: DeviceService) {
    this.initDevices();
  }

  async initDevices() {
    // TODO: initialize all devices
  }

  async getUserDeviceList(user_id: string): Promise<Device[]> {
    return this.device_list.filter((dev) => dev.owner_id === user_id);
  }

  async getUserDevice(
    device_id: string,
    user_id: string
  ): Promise<Device | undefined> {
    return this.device_list.find(
      (dev) => dev.id === device_id && dev.owner_id === user_id
    );
  }

  async removeUserDevice(device_id: string, user_id: string): Promise<boolean> {
    const device = await this.getUserDevice(device_id, user_id);
    if (!device) return false;

    const idx = this.device_list.indexOf(device);
    this.device_list.splice(idx, 1);
    await device.delete();

    return true;
  }
}
