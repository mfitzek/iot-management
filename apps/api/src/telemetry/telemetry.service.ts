import { ITelemetryDevice } from './../../../../libs/telemetry/src/interface/ITelemetry';
import { IDeviceData } from '@iot/device';
import { ISearchTelemetry, ITelemetryResponse, CacheTelemetryCollector } from '@iot/telemetry';
import { IUser } from '@iot/user';
import { Injectable } from '@nestjs/common';
import { DeviceManager } from '../device/device-manager.service';

@Injectable()
export class TelemetryService {
  // TODO: require user to check owner

  constructor(
    private telemetryCollector: CacheTelemetryCollector,
    private deviceManager: DeviceManager
  ) {}

  public async getTelemetry(user: IUser, query: ISearchTelemetry): Promise<ITelemetryResponse> {
    const result: ITelemetryResponse = {
      query: query,
      result: [],
    };

    return result;
  }

  private getUsersOwnedDevices(user: IUser) {
    return this.deviceManager.getUserDeviceList(user.id);
  }

  private getDevicesWithRequesteAttributes(
    devices: IDeviceData[],
    attributes_ids: string[]
  ): IDeviceData[] {
    const parsedDevices = devices.map((dev) => {
      return {
        ...dev,
        attributes: dev.attributes.filter((attr) => attributes_ids.find((a) => attr.id === a)),
      };
    });

    const filtered = parsedDevices.filter((dev) => dev.attributes.length);

    return filtered;
  }
}
