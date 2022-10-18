export interface IDevice {
  id: string;
  name: string;
  type: string;
  owner_id: string;

  attributes: IAttribute[];
  keyValues: KeyValues;
}

export interface IAttribute {
  name: string;
  type: 'number' | 'string' | 'any';
}

export type KeyValues = { [key: string]: string };
