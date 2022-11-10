import { ITelemetryService } from '@iot/telemetry';
import { IDeviceService } from '@iot/device';

export interface IProvidedServices {
  device_service: IDeviceService;
  telemetry_service: ITelemetryService;
}
