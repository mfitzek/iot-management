import { ISearchTelemetry } from '../interface/IApi';
import { PrismaClient } from '@prisma/client';
import { ITelemetry } from '../interface/ITelemetry';

export class TelemetryCache {
  private prisma = new PrismaClient();

  private primaryActive = true;
  private cacheCountLimit = 1000;
  private cacheTimeLimitMS = 5 * 60 * 1000;
  private primaryCache: ITelemetry[] = [];
  private secondaryCache: ITelemetry[] = [];

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

  public async saveTelemetry(telemetry: ITelemetry) {
    if (this.primaryActive) {
      this.primaryCache.push(telemetry);
    } else {
      this.secondaryCache.push(telemetry);
    }
  }
}
