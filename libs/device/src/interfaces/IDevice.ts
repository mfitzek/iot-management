export interface IDevice {
  id: string;
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
}

export interface IKeyValue {
  id?: string;
  key: string;
  value: string;
}
