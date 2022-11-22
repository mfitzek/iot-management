import { IProvidedServices } from './interfaces/ProvidedServices';
import { ISearchTelemetry, ITelemetry } from '@iot/telemetry';
import {
  IAttribute,
  IDevice,
  IDeviceData,
  IKeyValue,
} from './interfaces/IDevice';
import { IDeviceService } from './interfaces/IDeviceService';

export class Device implements IDevice {
  id: string;
  name: string;
  type: string;
  owner_id: string;

  attributes: IAttribute[];
  keyValues: IKeyValue[];

  db: IDeviceService;

  constructor(data: IDeviceData, protected providers: IProvidedServices) {
    this.db = providers.device_service;
    this.id = data.id!;
    this.name = data.name;
    this.type = data.type;
    this.attributes = data.attributes;
    this.keyValues = data.keyValues;
    this.owner_id = data.owner_id;
  }

  public getTelemetry(filter: ISearchTelemetry): Promise<ITelemetry[]> {
    const _filter: ISearchTelemetry = {
      ...filter,
      attribute_ids: filter.attribute_ids?.filter((a) => {
        return this.attributes.some((attr) => attr.id === a);
      }),
    };

    return this.providers.telemetry_service.getTelemetry(_filter);
  }

  public getData(): IDeviceData {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      attributes: this.attributes,
      keyValues: this.keyValues,
      owner_id: this.owner_id,
    };
  }

  public async delete() {
    return await this.db.removeDevice(this.id!);
  }

  public async update(data: IDeviceData) {
    await this.db.updateDevice(this.id!, data);
    await this.fetchData();
    return this.getData();
  }

  private async fetchData() {
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
