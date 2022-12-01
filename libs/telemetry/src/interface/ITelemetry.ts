export interface ITelemetryDevice {
  id: string;
  name: string;
  attributes: ITelemetryAttribute[];
}

export interface ITelemetryAttribute {
  id: string;
  name: string;
  type: string;
  telemetry: ITelemetry[];
}

export interface ITelemetry {
  id?: string;
  attribute_id: string;
  value: string;
  createdAt: Date;
}
