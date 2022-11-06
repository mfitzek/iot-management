import { IDevice, IDeviceData, IDeviceService } from '@iot/device';
import { Component } from 'vue';

export interface ICustomDevice {
  type: string;
  component: Component;
  factory(data: IDeviceData, device_service: IDeviceService): IDevice 
}
