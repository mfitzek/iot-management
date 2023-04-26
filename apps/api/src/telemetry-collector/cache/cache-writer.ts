import { Logger } from '@iot/logger';
import { PrismaClient } from '@prisma/client';
import { TelemetryCache } from '../telemetry-cache';
import { CacheRecordType, Monitor } from '@iot/monitor';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheWriter {
  private prisma = new PrismaClient();

  public async writeCacheToDatabase(cache: TelemetryCache) {
    const data = cache.getTelemetry({});
    if (data.length === 0) {
      return;
    }
    Monitor.instance.createRecord(CacheRecordType.DATABASE_WRITE);
    Logger.instance.info(`Writing cache to DB (${data.length} items)`);
    const transactions = data.map((row) => {
      return this.prisma.telemetry.create({
        data: {
          attributeId: row.attribute_id,
          createdAt: row.createdAt ?? new Date(),
          value: row.value,
        },
      });
    });
    await this.prisma.$transaction(transactions);
    cache.readyToDestroy = true;
  }
}
