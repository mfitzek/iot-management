import { PrismaClient } from '@prisma/client';

import { ITelemetry, ISearchTelemetry } from '@iot/telemetry';
import { TelemetryCollector } from '@iot/telemetry';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseTelemetryCollector implements TelemetryCollector {
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

  async saveTelemetry(telemetry: ITelemetry) {
    await this.prisma.telemetry.create({
      data: {
        attributeId: telemetry.attribute_id,
        value: telemetry.value,
        createdAt: telemetry.createdAt,
      },
    });
  }
}
