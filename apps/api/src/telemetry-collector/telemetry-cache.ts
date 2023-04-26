import { ITelemetry, ISearchTelemetry } from '@iot/telemetry';
import { CacheRecordType, Monitor } from '@iot/monitor';
import { Logger } from '@iot/logger';

export class TelemetryCache {
  public readyToDestroy = false;

  private cacheTimeout: NodeJS.Timeout;
  private cache: ITelemetry[] = [];

  constructor(
    private onCacheLock: () => void,
    private cacheRecordsLimit = 1000,
    private cacheTimeLimitMS = 5 * 60 * 1000
  ) {}

  public getTelemetry(filter: ISearchTelemetry) {
    const start = filter.date_from ?? new Date(0);
    const end = filter.date_to ?? new Date();

    return this.cache.filter((telemetry) => {
      if (telemetry.createdAt >= start && telemetry.createdAt <= end) {
        if (filter.attribute_ids === undefined) {
          return true;
        }
        if (filter.attribute_ids.find((attr) => telemetry.attribute_id === attr)) {
          return true;
        }
      }
      return false;
    });
  }

  public saveTelemetry(telemetry: ITelemetry) {
    Monitor.instance.createRecord(CacheRecordType.CACHE_WRITE);
    this.startTimeoutCache();
    this.cache.push(telemetry);
    if (this.cache.length >= this.cacheRecordsLimit) {
      this.onCacheLock();
    }
  }

  private startTimeoutCache() {
    if (this.cacheTimeout) {
      return;
    }
    Logger.instance.info(`Cache start timeout (${this.cacheTimeLimitMS} ms)`);
    this.cacheTimeout = setTimeout(() => {
      this.cacheTimeExceeded();
    }, this.cacheTimeLimitMS);
  }

  private async cacheTimeExceeded() {
    Logger.instance.info('Cache time exceeded 🚀');
    this.onCacheLock();
  }
}
