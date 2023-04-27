import { TelemetryCache } from './telemetry-cache';

import { ITelemetry, ISearchTelemetry } from '@iot/telemetry';
import { ConfigurationProvider } from '../settings/settings-provider.service';

import { Observer } from '@iot/utility';
import { TelemetryCacheSettings } from '@iot/configuration';
import { CacheWriter } from './cache/cache-writer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheTelemetryCollector implements Observer {
  private cacheSettings: TelemetryCacheSettings | undefined;
  private activeCache: TelemetryCache | null;
  private oldCaches: TelemetryCache[] = [];

  constructor(
    private configurationProvider: ConfigurationProvider,
    private cacheWriter: CacheWriter
  ) {
    this.configurationProvider.register(this);
    this.configureCollectors();
  }

  public onUpdate(): void {
    this.configureCollectors();
  }

  public getTelemetry(filter: ISearchTelemetry) {
    this.filterOutWrittenCache();

    const result = this.activeCache.getTelemetry(filter);
    this.oldCaches.forEach((cache) => {
      result.push(...cache.getTelemetry(filter));
    });
    return result;
  }

  public saveTelemetry(telemetry: ITelemetry) {
    this.filterOutWrittenCache();
    this.activeCache.saveTelemetry(telemetry);
  }

  private lockActiveCache() {
    this.cacheWriter.writeCacheToDatabase(this.activeCache);
    this.oldCaches.push(this.activeCache);
    this.activeCache = this.createNewCache();
  }

  private createNewCache() {
    if (this.cacheSettings) {
      return new TelemetryCache(
        () => this.lockActiveCache(),
        this.cacheSettings.maxNumberOfRecords,
        this.cacheSettings.cacheTimeoutMs
      );
    }
    return new TelemetryCache(() => this.lockActiveCache());
  }

  private filterOutWrittenCache() {
    this.oldCaches = this.oldCaches.filter((cache) => cache.readyToDestroy === false);
  }

  private async configureCollectors() {
    const settings = await this.configurationProvider.getSettings();
    this.cacheSettings = settings.telemetryCache;
    this.activeCache = this.createNewCache();
  }
}
