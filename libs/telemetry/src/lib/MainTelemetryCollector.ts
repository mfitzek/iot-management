import { Injectable } from '@nestjs/common';
import { ISearchTelemetry } from '../interface/IApi';
import { ITelemetry } from '../interface/ITelemetry';
import { TelemetryCollector } from '../interface/TelemetryCollector';
import { CacheTelemetryCollector } from './CacheTelemetryCollector';
import { DatabaseTelemetryCollector } from './DatabaseTelemetryCollector';
import { ConfiguratioProvider } from '@iot/configuration';
@Injectable()
export class MainTelemetryCollector implements TelemetryCollector {
  private cacheCollector: CacheTelemetryCollector;
  private databaseCollector: DatabaseTelemetryCollector;

  constructor(private configuration: ConfiguratioProvider) {
    this.cacheCollector = new CacheTelemetryCollector();
    this.databaseCollector = new DatabaseTelemetryCollector();
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
