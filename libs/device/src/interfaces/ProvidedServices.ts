import { HttpGateway } from '@iot/gateway/http';
import { TelemetryCollector } from '@iot/telemetry';
import { IDeviceService } from './IDeviceService';
import { IMqttService } from '@iot/gateway/mqtt';

export interface IProvidedServices {
  device_service: IDeviceService;
  telemetry_service: TelemetryCollector;
  mqtt_service: IMqttService;
  http_service: HttpGateway;
}
