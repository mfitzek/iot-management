export interface IDevice {
  id: string;
  name: string;
  type: string;
  owner_id: string;

  attributes: IAttribute[];
  keyValues: { [key: string]: string };
}

export interface IAttribute {
  name: string;
  type: 'number' | 'string' | 'any';
}
