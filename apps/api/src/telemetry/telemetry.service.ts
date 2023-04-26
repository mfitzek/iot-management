import { DeviceData } from '@iot/device';
import {
  ISearchTelemetry,
  ITelemetry,
  ITelemetryAttribute,
  ITelemetryDevice,
  ITelemetryResponse,
} from '@iot/telemetry';
import { IUser } from '@iot/user';
import { Injectable } from '@nestjs/common';
import { DeviceManager } from '../device/device-manager.service';
import { TelemetryCollectorService } from '../telemetry-collector';
import { JsonTelemetryDataExporter } from './data-exporter/json-data-exporter';
import { CsvTelemetryDataExporter } from './data-exporter/csv-data-exporter';
import { XmlTelemetryDataExporter } from './data-exporter/xml-data-exporter';

@Injectable()
export class TelemetryService {
  constructor(
    private telemetryCollector: TelemetryCollectorService,
    private deviceManager: DeviceManager
  ) {}

  public async getTelemetry(user: IUser, query: ISearchTelemetry): Promise<ITelemetryResponse> {
    const telemetry = await this.telemetryCollector.getTelemetry(query);
    const telemetryGroups = this.groupTelemetryData(telemetry);
    const userDevices = await this.getUsersOwnedDevices(user);

    const merged = this.mergeDeviceWithData(userDevices, telemetryGroups);

    const result: ITelemetryResponse = {
      query: query,
      result: merged,
    };

    return result;
  }

  public async exportTelemetry(user: IUser, query: ISearchTelemetry) {
    const data = await this.getTelemetry(user, query);
    const parsers = {
      JSON: new JsonTelemetryDataExporter(),
      CSV: new CsvTelemetryDataExporter(),
      XML: new XmlTelemetryDataExporter(),
    };
    if (query.exportFormat in parsers) {
      return parsers[query.exportFormat].export(data.result);
    }
    return 'Format is not supported';
  }

  private groupTelemetryData(telemetry: ITelemetry[]) {
    const map = new Map<string, ITelemetry[]>();
    telemetry.forEach((data) => {
      const id = data.attribute_id;
      if (map.has(id)) {
        map.get(id).push(data);
      } else {
        map.set(id, [data]);
      }
    });

    return map;
  }

  private mergeDeviceWithData(devices: DeviceData[], data: Map<string, ITelemetry[]>) {
    const result: ITelemetryDevice[] = devices.map((dev) => {
      const attributes: ITelemetryAttribute[] = dev.attributes.map((attr) => {
        return {
          id: attr.id,
          name: attr.name,
          type: attr.type,
          telemetry: data.get(attr.id) ?? [],
        };
      });
      return {
        id: dev.id,
        name: dev.name,
        attributes: attributes.filter((attr) => attr.telemetry.length),
      };
    });
    return result.filter((dev) => dev.attributes.length);
  }

  private async getUsersOwnedDevices(user: IUser) {
    const devices = await this.deviceManager.getUserDevices(user.id);
    return devices.map((device) => device.getData());
  }
}
