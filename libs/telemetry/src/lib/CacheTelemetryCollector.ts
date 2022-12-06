import { TelemetryCache } from './TelemetryCache';
import { ISearchTelemetry } from '../interface/IApi';
import { ITelemetry } from '../interface/ITelemetry';

export class CacheTelemetryCollector {
  private primaryActive = true;

  private cacheRecordsLimit = 1000; // TODO: STATE MANAGER
  private cacheTimeLimitMS = 5 * 60 * 1000;

  private primaryCache: TelemetryCache;
  private secondaryCache: TelemetryCache;

  constructor() {
    this.primaryCache = new TelemetryCache(
      this.cacheRecordsLimit,
      this.cacheTimeLimitMS,
      this.currentCacheWriting
    );
    this.secondaryCache = new TelemetryCache(
      this.cacheRecordsLimit,
      this.cacheTimeLimitMS,
      this.currentCacheWriting
    );
  }

  public getTelemetry(filter: ISearchTelemetry) {
    return this.getCurrentCache().getTelemetry(filter);
  }

  public saveTelemetry(telemetry: ITelemetry) {
    this.getCurrentCache().saveTelemetry(telemetry);
  }

  private getCurrentCache() {
    return this.primaryActive ? this.primaryCache : this.secondaryCache;
  }

  private currentCacheWriting(reason: string) {
    this.primaryActive = !this.primaryActive;
    if (reason === 'countLimit') {
      console.warn('Cache reaches the limit, adjust time or cache capacity.');
      // TODO: some state manager for administration?
    }
  }
}
