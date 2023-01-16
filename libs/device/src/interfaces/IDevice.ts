import { DeviceStatusInfo } from './../api-interface';
import { ITelemetry, ISearchTelemetry } from '@iot/telemetry';
import { DeviceData } from '../api-interface';

export interface IDevice {
  getId(): string;
  getOwnerId(): string;

  getShortInfo(): DeviceStatusInfo;

  getData(): DeviceData;
  update(data: DeviceData): Promise<DeviceData>;
  delete(): Promise<boolean>;
  getTelemetry(filter: ISearchTelemetry): Promise<ITelemetry[]>;
}

export interface IAttribute {
  id?: string;
  name: string;
  type: string;
  to_be_deleted?: boolean;
}

export interface IKeyValue {
  id?: string;
  key: string;
  value: string;
  to_be_deleted?: boolean;
}
