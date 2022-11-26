import { IAttribute } from "@iot/device";

export interface ITelemetry {
  id?: string;
  attribute_id: string;
  value: string;
  createdAt: Date;
}


export interface IAttributeTelemetry extends IAttribute {
  telemetry: ITelemetry[];
}
