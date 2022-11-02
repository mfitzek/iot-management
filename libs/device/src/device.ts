import { IAttribute, IDeviceData, IKeyValue } from './interfaces/IDevice';
import { IDeviceService } from './interfaces/IDeviceService';

export class Device {
  id?: string;
  name: string;
  type: string;
  owner_id: string;

  attributes: IAttribute[];
  keyValues: IKeyValue[];

  constructor(protected db: IDeviceService, data: IDeviceData) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.attributes = data.attributes;
    this.keyValues = data.keyValues;
    this.owner_id = data.owner_id;
  }

  async save() {
    throw new Error('Not implemented');
  }

  getData(): IDeviceData {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      attributes: this.attributes,
      keyValues: this.keyValues,
      owner_id: this.owner_id,
    };
  }

  async delete() {
    throw new Error('Not implemented');
  }

  async update(data: any) {
    throw new Error('Not implemented');
  }
}
