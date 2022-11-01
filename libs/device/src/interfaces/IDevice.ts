export interface IDevice {
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
