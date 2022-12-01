interface ITelemetry {
  createdAt: Date;
  value: string;
}

interface ISearchTelemetry {
  attributesIds: string[];
  dateStart?: Date;
  dateEnd?: Date;
}

interface ITelemetryResponse1 {
  query: ISearchTelemetry;
  result: ITelemetryDevice[];
}

interface ITelemetryDevice {
  id: string;
  name: string;
  attributes: ITelemetryAttribute[];
}

interface ITelemetryAttribute {
  id: string;
  name: string;
  type: string;
  telemetry: ITelemetry[];
}
