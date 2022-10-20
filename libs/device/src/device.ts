import { IAttribute, IDevice, KeyValues } from './interfaces/IDevice';
import { IDeviceService } from './interfaces/IDeviceService';

export class Device {
  id: string;
  name: string;
  type: string;
  owner_id: string;

  attributes: IAttribute[];
  keyValues: KeyValues;

  constructor(protected db: IDeviceService, data: IDevice) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.attributes = data.attributes;
    this.keyValues = data.keyValues;
    this.owner_id = data.owner_id;
  }

  async save() {
    return this.db.UpdateDevice(this.id, this.getData());
  }

  getData(): IDevice {
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
    // todo remove device;
  }

  async update(data: any) {}
}
