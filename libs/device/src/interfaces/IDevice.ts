export interface IDevice {
  id: string;
  owner_id: string;

  getData(): IDeviceData;
  update(data: IDeviceData): Promise<IDeviceData>;
  delete(): Promise<boolean>;
}

export interface IDeviceData {
  id?: string;
  name: string;
  type: string;
  owner_id: string;

  attributes: IAttribute[];
  keyValues: IKeyValue[];
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

export interface ITelemetry {
  id?: string;
  attribute: IAttribute;
  date: Date;
  value: string;
}
