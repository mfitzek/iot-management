export type TelemetryData = {
  attributeName: string;
  value: string;
};

export type RegisterSettings = {
  accessToken: string;
  onTelemetryHandler: (telemetryData: TelemetryData) => void;
};

export type RequestData = {
  accessToken: string;
  telemetry: TelemetryData[];
};

export enum AccessResult {
  Success = 'Success',
  Denied = 'Denied',
}

export interface HttpGateway {
  onTelemetry(deviceId: string, requestData: RequestData): AccessResult;
  registerDevice(deviceId: string, settings: RegisterSettings): void;
  unregisterDevice(deviceId: string): void;
}
