import { TelemetryCache } from './telemetry-cache';

import { ITelemetry, ISearchTelemetry } from '@iot/telemetry';
import { ConfiguratioProvider } from '../settings/settings-provider.service';

import { Observer } from '@iot/utility';
export class CacheTelemetryCollector implements Observer {
  private primaryActive = true;

  private primaryCache: TelemetryCache;
  private secondaryCache: TelemetryCache;

  constructor(private configurationProvider: ConfiguratioProvider) {
    this.primaryCache = new TelemetryCache(this.currentCacheWriting);
    this.secondaryCache = new TelemetryCache(this.currentCacheWriting);

    this.configurationProvider.register(this);

    this.configureCollectors();
  }

  public onUpdate(): void {
    this.configureCollectors();
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
    }
  }
  private async configureCollectors() {
    const settings = await this.configurationProvider.getSettings();
    this.primaryCache.changeSettings(settings.telemetryCache);
    this.secondaryCache.changeSettings(settings.telemetryCache);
  }
}
