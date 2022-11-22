import { ITelemetryService } from '@iot/telemetry';
import { IDeviceService } from './IDeviceService';
import { IMqttService } from '@iot/gateway/mqtt';

export interface IProvidedServices {
  device_service: IDeviceService;
  telemetry_service: ITelemetryService;
  mqtt_service: IMqttService;
}
