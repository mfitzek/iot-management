import { IAttribute, IKeyValue } from './interfaces/IDevice';

export interface CreateDevice {
  name: string;
  type: string;
}

export interface DeviceData {
  id: string;
  name: string;
  type: string;
  owner_id: string;

  attributes: IAttribute[];
  keyValues: IKeyValue[];
}

export interface DeviceList {
  id: string;
  name: string;
  type: string;

  lastData: Date;
  status: string;
}
