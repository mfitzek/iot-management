export enum WarningSeverity {
  WARNING = 'warning',
  CRITICAL = 'critical',
}

export interface Warning {
  device_id: string;
  device_name: string;
  message: string;
  severity: WarningSeverity;
}
