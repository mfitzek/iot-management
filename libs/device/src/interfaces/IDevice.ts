import { ISearchTelemetry, ITelemetry } from '@iot/telemetry';
import { DeviceData, DeviceStatusInfo } from '../api-interface';

import { CustomRequest, CustomRouteResponse } from './CustomRoute';
import { UpdateDevice } from './DeviceApi';

export interface IDevice {
  getId(): string;
  getOwnerId(): string;

  getShortInfo(): Promise<DeviceStatusInfo>;
  getData(): DeviceData;

  onCreate(): void;
  update(data: UpdateDevice): Promise<DeviceData>;
  delete(): Promise<boolean>;

  getTelemetry(filter: ISearchTelemetry): Promise<ITelemetry[]>;

  handleCustomRoute(request: CustomRequest): Promise<CustomRouteResponse | 'not defined'>;
}

export interface IAttribute {
  id: string;
  name: string;
  type: string;
  to_be_deleted?: boolean;
}

export interface IKeyValue {
  id: string;
  key: string;
  value: string;
  to_be_deleted?: boolean;
}
