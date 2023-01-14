import { IDevice, IDeviceData, IProvidedServices } from '@iot/device';
import { Component } from 'vue';

export interface CustomDevice {
  getType(): string;
  getMainComponent(): Component;
  getDevice(data: IDeviceData, providers: IProvidedServices): IDevice;
}
