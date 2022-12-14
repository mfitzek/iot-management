export interface DatabaseSettings {
  maxDatabaseSizeMB: number;
}
export interface TelemetryCacheSettings {
  maxNumberOfRecords: number;
  cacheTimeoutMs: number;
}

export interface Settings {
  database: DatabaseSettings;
  telemetryCache: TelemetryCacheSettings;
}
