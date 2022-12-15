import { PrismaClient } from '@prisma/client';
import { ITelemetry, ISearchTelemetry } from '@iot/telemetry';
import { TelemetryCacheSettings } from '@iot/configuration';

export class TelemetryCache {
  private prisma = new PrismaClient();

  private cacheRecordsLimit = 1000;
  private cacheTimeLimitMS = 5 * 60 * 1000;
  private cacheWriteCb: (event: string) => void;
  private cacheTimeout: NodeJS.Timeout;
  private cache: ITelemetry[] = [];

  constructor(onCacheDBWrite: (event: string) => void) {
    this.cacheWriteCb = onCacheDBWrite;
  }

  public changeSettings(settings: TelemetryCacheSettings) {
    this.cacheRecordsLimit = settings.maxNumberOfRecords;
    this.cacheTimeLimitMS = settings.cacheTimeoutMs;

    console.log('Update settings');

    if (this.cache.length > 0) {
      this.writeCacheToDatabase();
    }
  }

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
    this.startTimeoutCacheIfNotStarted();
    this.cache.push(telemetry);
    if (this.cache.length >= this.cacheRecordsLimit) {
      this.cacheWriteCb('countLimit');
      this.writeCacheToDatabase();
    }
  }

  private startTimeoutCacheIfNotStarted() {
    if (this.cacheTimeout) {
      return;
    }
    this.startTimeoutCache();
  }

  private startTimeoutCache() {
    console.log('Start new timeout ', this.cacheTimeLimitMS);
    clearTimeout(this.cacheTimeout);
    this.cacheTimeout = setTimeout(() => {
      this.cacheTimeExceeded();
    }, this.cacheTimeLimitMS);
  }
  private stopTimeoutCache() {
    if (this.cacheTimeout) {
      clearTimeout(this.cacheTimeout);
      this.cacheTimeout = null;
    }
  }

  private async cacheTimeExceeded() {
    console.log('Cache timeout 🚀 🌙');
    if (this.cache.length === 0) {
      return;
    }
    this.cacheWriteCb('timeExceeded');
    await this.writeCacheToDatabase();
  }

  private async writeCacheToDatabase() {
    console.log('Writing to DB', this.cache.length);

    const transactions = this.cache.map((row) => {
      return this.prisma.telemetry.create({
        data: {
          attributeId: row.attribute_id,
          createdAt: row.createdAt ?? new Date(),
          value: row.value,
        },
      });
    });

    await this.prisma.$transaction(transactions);
    this.cache = [];
    this.stopTimeoutCache();
  }
}
