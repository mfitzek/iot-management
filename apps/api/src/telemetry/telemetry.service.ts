import { ITelemetry, ITelemetryAttribute, ITelemetryDevice } from '@iot/telemetry';
import { IDeviceData } from '@iot/device';
import { ISearchTelemetry, ITelemetryResponse, MainTelemetryCollector } from '@iot/telemetry';
import { IUser } from '@iot/user';
import { Injectable } from '@nestjs/common';
import { DeviceManager } from '../device/device-manager.service';

@Injectable()
export class TelemetryService {
  // TODO: require user to check owner

  constructor(
    private telemetryCollector: MainTelemetryCollector,
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


  private groupTelemetryData(telemetry: ITelemetry[]){
    const map = new Map<string, ITelemetry[]>()
    telemetry.forEach(data=>{
      const id = data.attribute_id;
      if(map.has(id)){
        map.get(id).push(data);
      }else{
        map.set(id, [data]);
      }
    });

    return map;
  }

  private mergeDeviceWithData(devices: IDeviceData[], data: Map<string, ITelemetry[]>){
    const result: ITelemetryDevice[] = devices.map(dev=>{
      const attributes: ITelemetryAttribute[] = dev.attributes.map(attr=>{
        return {
          id: attr.id,
          name: attr.name,
          type: attr.type,
          telemetry: data.get(attr.id)?? []
        }
      });
      return {
        id: dev.id,
        name: dev.name,
        attributes: attributes.filter(attr=>attr.telemetry.length)
      }
    });
    return result.filter(dev=>dev.attributes.length);
  }


  private getUsersOwnedDevices(user: IUser) {
    return this.deviceManager.getUserDeviceList(user.id);
  }

}
