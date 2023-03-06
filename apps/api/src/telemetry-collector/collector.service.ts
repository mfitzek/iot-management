import { Injectable, OnModuleDestroy } from '@nestjs/common';

import { ITelemetry, ISearchTelemetry } from '@iot/telemetry';
import { TelemetryCollector } from '@iot/telemetry';
import { CacheTelemetryCollector } from './cache-telemetry-collector';
import { DatabaseTelemetryCollector } from './database-telemetry-collector';
import { ConfiguratioProvider } from '../settings/settings-provider.service';

@Injectable()
export class TelemetryCollectorService implements TelemetryCollector, OnModuleDestroy {
  private cacheCollector: CacheTelemetryCollector;
  private databaseCollector: DatabaseTelemetryCollector;

  constructor(private configurationProvider: ConfiguratioProvider) {
    this.cacheCollector = new CacheTelemetryCollector(configurationProvider);
    this.databaseCollector = new DatabaseTelemetryCollector();
  }
  async onModuleDestroy() {
    console.clear();
    console.log('asdasds');
    await this.cacheCollector.onModuleDestroy();
  }

  async getTelemetry(filter: ISearchTelemetry): Promise<ITelemetry[]> {
    const cachedData = this.cacheCollector.getTelemetry(filter);
    const dbData = await this.databaseCollector.getTelemetry(filter);

    const merged = [...cachedData, ...dbData];
    merged.sort((a, b) => {
      return a.createdAt.getTime() - b.createdAt.getTime();
    });

    return merged;
  }

  saveTelemetry(telemetry: ITelemetry) {
    this.cacheCollector.saveTelemetry(telemetry);
  }
}
