import { IAttribute, IKeyValue } from './interfaces/IDevice';

export interface CreateDevice {
  name: string;
  type: string;
}

export type DeviceState = Record<string, unknown>;

export interface DeviceData {
  id: string;
  name: string;
  type: string;
  owner_id: string;

  attributes: IAttribute[];
  keyValues: IKeyValue[];

  state?: DeviceState;
}

export interface DeviceStatusInfo {
  id: string;
  name: string;
  type: string;

  lastData?: Date;
  status?: string;
  state?: DeviceState;
}

export interface DeviceListAdmin extends DeviceStatusInfo {
  user: string;
}
