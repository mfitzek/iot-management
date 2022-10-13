export interface IDevice {
  name: string;
  type: string;

  attributes: IAttribute[];
  keyValues: { [key: string]: string };
}

export interface IAttribute {
  name: string;
  type: 'number' | 'string' | 'any';
}
