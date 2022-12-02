import { ISearchTelemetry } from '../interface/IApi';
import { PrismaClient } from '@prisma/client';
import { ITelemetry } from '../interface/ITelemetry';

export class TelemetryCache {
  private prisma = new PrismaClient();

  private primaryCache: ITelemetry[] = [];
  private secondaryCache: ITelemetry[] = [];

  private writeCacheToDatabase(cache: ITelemetry[]) {
    //  TODO:  write cache
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
}
