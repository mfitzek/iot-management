import { PrismaClient } from '@prisma/client';
import { ITelemetry, ISearchTelemetry } from '@iot/telemetry';

export class TelemetryCache {
  public readyToDestroy = false;

  private prisma = new PrismaClient();
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
    this.startTimeoutCache();
    this.cache.push(telemetry);
    if (this.cache.length >= this.cacheRecordsLimit) {
      this.writeCacheToDatabase();
    }
  }

  public async shutdownSave() {
    console.log('Writing cache to DB', this.cache.length);
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
  }

  private startTimeoutCache() {
    if (this.cacheTimeout) {
      return;
    }
    console.log('Start ', this.cacheTimeLimitMS);
    this.cacheTimeout = setTimeout(() => {
      this.cacheTimeExceeded();
    }, this.cacheTimeLimitMS);
  }

  private async cacheTimeExceeded() {
    console.log('Cache time exceeded 🚀');
    await this.writeCacheToDatabase();
  }

  private async writeCacheToDatabase() {
    this.onCacheLock();
    console.log('Writing cache to DB', this.cache.length);
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
    this.readyToDestroy = true;
  }
}
