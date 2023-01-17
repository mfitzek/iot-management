import { AccessResult, HttpGateway, RegisterSettings, RequestData } from '@iot/gateway/http';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpGatewayService implements HttpGateway {
  private registredDevices: Map<string, RegisterSettings>;

  constructor() {
    this.registredDevices = new Map<string, RegisterSettings>();
  }
  unregisterDevice(deviceId: string): void {
    this.registredDevices.delete(deviceId);
  }

  registerDevice(deviceId: string, settings: RegisterSettings): void {
    this.registredDevices.set(deviceId, settings);
  }

  onTelemetry(deviceId: string, requestData: RequestData): AccessResult {
    const device = this.registredDevices.get(deviceId);
    if (!device) return AccessResult.Denied;
    if (device.accessToken !== requestData.accessToken) return AccessResult.Denied;

    for (const telemetry of requestData.telemetry) {
      device.onTelemetryHandler(telemetry);
    }

    return AccessResult.Success;
  }
}
