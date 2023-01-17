import { ISearchTelemetry, ITelemetry } from '@iot/telemetry';
import { DeviceData, DeviceStatusInfo } from './api-interface';
import { CustomRequest, CustomRouteResponse } from './interfaces/CustomRoute';
import { IAttribute, IDevice, IKeyValue } from './interfaces/IDevice';
import { IDeviceService } from './interfaces/IDeviceService';
import { IProvidedServices } from './interfaces/ProvidedServices';

export class Device implements IDevice {
  private id: string;
  private owner_id: string;
  name: string;
  type: string;

  attributes: IAttribute[];
  keyValues: IKeyValue[];

  db: IDeviceService;

  constructor(data: DeviceData, protected providers: IProvidedServices) {
    this.db = providers.device_service;
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.attributes = data.attributes;
    this.keyValues = data.keyValues;
    this.owner_id = data.owner_id;
  }

  async handleCustomRoute(request: CustomRequest): Promise<CustomRouteResponse> {
    return 'not defined';
  }

  getShortInfo(): DeviceStatusInfo {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
    };
  }

  getId(): string {
    return this.id;
  }
  getOwnerId(): string {
    return this.owner_id;
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

  public getData(): DeviceData {
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
    return await this.db.removeDevice(this.id);
  }

  public async update(data: DeviceData) {
    await this.db.updateDevice(this.id, data);
    await this.fetchData();
    return this.getData();
  }

  private async fetchData() {
    const data = await this.db.getDevice(this.id);
    if (data) {
      this.name = data.name;
      this.type = data.type;
      this.attributes = data.attributes;
      this.keyValues = data.keyValues;
      this.owner_id = data.owner_id;
    }
  }
}
