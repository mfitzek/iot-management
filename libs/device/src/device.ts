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
    return await this.db.removeDevice(this.id!);
  }

  async update(data: IDeviceData) {
    await this.db.updateDevice(this.id!, data);
    await this.fetchData();
    return this.getData();
  }

  async fetchData() {
    const data = await this.db.getDevice(this.id!);
    if (data) {
      this.name = data.name;
      this.type = data.type;
      this.attributes = data.attributes;
      this.keyValues = data.keyValues;
      this.owner_id = data.owner_id;
    }
  }
}
