import { ICustomDevice } from '@iot/custom-device';
import { BasicDevice } from '@iot/basic-device';
import {
  CustomDeviceAlreadyExistsError,
  CustomDeviceIsNotDefinedError,
} from '../errors/DeviceManagerErrors';

export class DeviceTypeManager {
  private devices = new Map<string, ICustomDevice>();
  private static _instance = new DeviceTypeManager();

  private constructor() {
    this.registerDeviceType('basic-device', new BasicDevice());
  }

  public static get instance() {
    if (this._instance == null) {
      this._instance = new DeviceTypeManager();
    }
    return this._instance;
  }

  public registerDeviceType(type: string, device: ICustomDevice) {
    if (this.devices.has(type)) {
      throw new CustomDeviceAlreadyExistsError(type);
    }
    this.devices.set(type, device);
    return this;
  }

  public getDevice(type: string): ICustomDevice {
    const device = this.devices.get(type);
    if (device === undefined) {
      throw new CustomDeviceIsNotDefinedError(type);
    }
    return device;
  }

  public getTypesList(): Array<string> {
    return [...this.devices.keys()];
  }
}
