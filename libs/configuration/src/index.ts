export interface DatabaseSettings {
  maxDatabaseSizeMB: number;
}
export interface TelemetryCacheSettings {
  maxNumberOfRecords: number;
  cacheTimeoutMs: number;
}

export interface MailSettings {
  gmail: string;
  password: string;
}

export interface Settings {
  database: DatabaseSettings;
  telemetryCache: TelemetryCacheSettings;
  mailSettings?: MailSettings;
}
