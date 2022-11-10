import { IDevice, IDeviceData } from '@iot/device';
import { Component } from 'vue';
import { IProvidedServices } from './ProvidedServices';

export interface ICustomDevice {
  type: string;
  component: Component;
  factory(data: IDeviceData, providers: IProvidedServices): IDevice;
}
