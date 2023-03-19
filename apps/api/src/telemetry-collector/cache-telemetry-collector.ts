import { TelemetryCache } from './telemetry-cache';

import { ITelemetry, ISearchTelemetry } from '@iot/telemetry';
import { ConfiguratioProvider } from '../settings/settings-provider.service';

import { Observer } from '@iot/utility';
import { TelemetryCacheSettings } from '@iot/configuration';
export class CacheTelemetryCollector implements Observer {
  private cacheSettings: TelemetryCacheSettings | undefined;
  private activeCache: TelemetryCache | null;
  private oldCaches: TelemetryCache[] = [];

  constructor(private configurationProvider: ConfiguratioProvider) {
    this.configurationProvider.register(this);
    this.configureCollectors();

    this.activeCache = this.createNewCache();
  }
  async onModuleDestroy() {
    await this.activeCache.shutdownSave();
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
  }
}
