import { Injectable } from '@nestjs/common';
import { DeviceService } from './device.service';
import { Device, IDevice, IDeviceData } from '@iot/device';
import { DeviceTypeManager } from '@iot/custom-device-manager';

@Injectable()
export class DeviceManager {
  device_list: IDevice[] = [];

  constructor(private devices: DeviceService) {
    this.initDevices();
  }

  async initDevices() {
    const devices_data = await this.devices.getDeviceList();
    this.device_list = devices_data.map(
      (device_data) => this.createCustomDevice(device_data)
    );
  }

  async createDevice(data: IDeviceData) {
    const created = await this.devices.createDevice(data);
    const device = this.createCustomDevice(created);
    this.device_list.push(device);
    return device.getData();
  }

  async getUserDeviceList(user_id: string): Promise<IDeviceData[]> {
    return this.device_list
      .filter((dev) => dev.owner_id === user_id)
      .map((dev) => dev.getData());
  }

  async getUserDevice(
    device_id: string,
    user_id: string
  ): Promise<IDevice | undefined> {
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

  private createCustomDevice(data: IDeviceData){
    const custom_device = DeviceTypeManager.instance.getDevice(data.type);
    return custom_device.factory(data, this.devices);
  }

}
