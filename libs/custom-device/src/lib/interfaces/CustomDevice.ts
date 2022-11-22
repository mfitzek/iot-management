import { IDevice, IDeviceData, IProvidedServices } from '@iot/device';
import { Component } from 'vue';

export interface ICustomDevice {
  type: string;
  component: Component;
  factory(data: IDeviceData, providers: IProvidedServices): IDevice;
}
