import { DeviceData, DeviceState } from '@iot/device';

export * from './common/HttpSettings';
export * from './common/IMqttSettings';
export * from './common/mqtt';

export type BasicDeviceState = DeviceState & { lastData: string | undefined };
export interface BasicDeviceData extends DeviceData {
  state: BasicDeviceState;
}
