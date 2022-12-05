import { ISearchTelemetry } from '../interface/IApi';
import { PrismaClient } from '@prisma/client';
import { ITelemetry } from '../interface/ITelemetry';

export class CacheTelemetryCollector {
  private prisma = new PrismaClient();

  private primaryActive = true;
  private cacheRecordsLimit = 1000;
  private cacheTimeLimitMS = 5 * 60 * 1000; // TODO implement cache timeout to write DB
  private primaryCache: ITelemetry[] = [];
  private secondaryCache: ITelemetry[] = [];

  public getTelemetry(filter: ISearchTelemetry) {
    const currentCache: ITelemetry[] = []; // TODO: get current cache

    const start = filter.date_from ?? new Date(0);
    const end = filter.date_to ?? new Date();

    return currentCache.filter((telemetry) => {
      if (telemetry.createdAt >= start && telemetry.createdAt <= end) {
        if (filter.attribute_ids.find((attr) => telemetry.attribute_id === attr)) {
          return true;
        }
      }
      return false;
    });
  }

  public saveTelemetry(telemetry: ITelemetry) {
    if (this.primaryActive) {
      this.saveToPrimaryCache(telemetry);
    } else {
      this.saveToSecondaryCache(telemetry);
    }
  }

  private async saveToPrimaryCache(telemetry: ITelemetry) {
    this.primaryCache.push(telemetry);
    if (this.primaryCache.length >= this.cacheRecordsLimit) {
      this.primaryActive = false;
      await this.writeCacheToDatabase(this.primaryCache);
      this.primaryCache = [];
    }
  }
  private async saveToSecondaryCache(telemetry: ITelemetry) {
    this.secondaryCache.push(telemetry);
    if (this.secondaryCache.length >= this.cacheRecordsLimit) {
      this.primaryActive = true;
      await this.writeCacheToDatabase(this.secondaryCache);
      this.secondaryCache = [];
    }
  }

  private async writeCacheToDatabase(cache: ITelemetry[]) {
    const transactions = cache.map((row) => {
      return this.prisma.telemetry.create({
        data: {
          attributeId: row.attribute_id,
          createdAt: row.createdAt ?? new Date(),
          value: row.value,
        },
      });
    });

    await this.prisma.$transaction(transactions);

    return;
  }
}
