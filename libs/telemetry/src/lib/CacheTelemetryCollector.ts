import { ITelemetry } from '../interface/ITelemetry';
import { ISearchTelemetry } from '../interface/IApi';
import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { TelemetryCollector } from '../interface/TelemetryCollector';

@Injectable()
export class CacheTelemetryCollector implements TelemetryCollector {
  private telemetry: ITelemetry[] = [];
  private prisma = new PrismaClient();

  async getTelemetry(filter: ISearchTelemetry): Promise<ITelemetry[]> {
    const data = await this.prisma.telemetry.findMany({
      where: {
        attributeId: {
          in: filter.attribute_ids ?? [],
        },
        createdAt: {
          lte: filter.date_to,
          gte: filter.date_from,
        },
      },
    });

    const result = data.map((t) => {
      return {
        attribute_id: t.attributeId,
        value: t.value,
        createdAt: t.createdAt,
      };
    });

    return result;
  }

  saveTelemetry(telemetry: ITelemetry) {
    this.telemetry.push(telemetry);
    this.saveTelemetryToDatabase(telemetry);
  }

  async saveTelemetryToDatabase(telemetry: ITelemetry) {
    await this.prisma.telemetry.create({
      data: {
        attributeId: telemetry.attribute_id,
        value: telemetry.value,
        createdAt: telemetry.createdAt,
      },
    });
  }
}
