import { IDevice, DeviceData, IProvidedServices } from '@iot/device';
import { Component } from 'vue';

export interface CustomDevice {
  getType(): string;
  getMainComponent(): Component;
  getDevice(data: DeviceData, providers: IProvidedServices): Promise<IDevice>;
}
