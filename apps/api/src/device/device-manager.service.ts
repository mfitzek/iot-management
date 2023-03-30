import { CreateUserDevice, DeviceData, IDevice } from '@iot/device';
import { Injectable } from '@nestjs/common';
import { HttpGatewayService } from './../gateway/http-gateway/http-gateway.service';
import { DeviceService } from './device.service';

import { IProvidedServices } from '@iot/device';

import { Observer } from '@iot/utility';
import { getDeviceFactory } from '../custom-devices/supported-device-factory';
import { MqttService } from '../gateway/mqtt-gateway/mqtt.service';
import { BackupService } from '../settings/backup/backup.service';
import { TelemetryCollectorService } from '../telemetry-collector';

@Injectable()
export class DeviceManager implements Observer {
  device_list: IDevice[] = [];

  constructor(
    private device_service: DeviceService,
    private telemetry_service: TelemetryCollectorService,
    private mqtt_service: MqttService,
    private http_service: HttpGatewayService,
    private backupServicer: BackupService
  ) {
    this.initDevices();
    this.backupServicer.register(this);
  }
  onUpdate(): void {
    this.mqtt_service.quitService();

    this.initDevices();
  }

  async initDevices() {
    const devices_data = await this.device_service.getDeviceList();
    for (const deviceData of devices_data) {
      const device = await this.createCustomDevice(deviceData);
      this.device_list.push(device);
    }
  }

  async createDevice(data: CreateUserDevice) {
    const created = await this.device_service.createDevice(data);
    const device = await this.createCustomDevice(created);
    device.onCreate();
    this.device_list.push(device);
    return device;
  }

  async getUserDevices(user_id: string): Promise<IDevice[]> {
    return this.device_list.filter((device) => device.getOwnerId() === user_id);
  }

  async getUserDevice(device_id: string, user_id: string): Promise<IDevice | undefined> {
    console.log({ device_id, user_id });
    return this.device_list.find(
      (dev) => dev.getId() === device_id && dev.getOwnerId() === user_id
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

  public async copyDevice(
    device_id: string,
    user_id: string,
    name: string
  ): Promise<IDevice | null> {
    const existingDevice = await this.getUserDevice(device_id, user_id);
    if (existingDevice) {
      const data = existingDevice.getData();
      return this.createDevice({
        name: name,
        type: data.type,
        owner_id: user_id,
        attributes: data.attributes,
        keyValues: data.keyValues,
      });
    }
    return null;
  }

  private createCustomDevice(data: DeviceData) {
    const deviceFactory = getDeviceFactory(data.type);
    return deviceFactory.createDevice(data, this.getServiceProviders());
  }

  private getServiceProviders(): IProvidedServices {
    return {
      device_service: this.device_service,
      telemetry_service: this.telemetry_service,
      mqtt_service: this.mqtt_service,
      http_service: this.http_service,
    };
  }
}
