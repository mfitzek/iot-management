import { HttpGateway } from '@iot/gateway/http';
import { IMqttService } from '@iot/gateway/mqtt';
import { TelemetryCollector } from '@iot/telemetry';
import { IDeviceService } from './IDeviceService';

export interface IProvidedServices {
  device_service: IDeviceService;
  telemetry_service: TelemetryCollector;
  mqtt_service: IMqttService;
  http_service: HttpGateway;
}
