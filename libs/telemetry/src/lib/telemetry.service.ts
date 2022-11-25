import { ITelemetry } from './../interface/ITelemetry';
import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import {
  ISearchTelemetry,
  ITelemetryService,
} from '../interface/ITelemetryService';

@Injectable()
export class TelemetryService implements ITelemetryService {
  private telemetry: ITelemetry[] = [];
  private prisma = new PrismaClient();

  async getTelemetry(filter: ISearchTelemetry): Promise<ITelemetry[]> {
    const data = await this.prisma.telemetry.findMany({
      where: {
        attributeId: {
          in: filter.attribute_ids,
        },
        createdAt: {
          lte: filter.date_to,
          gte: filter.date_from,
        },
      },
    });

    // TODO: return array of filtered attributes with telemetry filtered by date start and date end
    const attr_data = await this.prisma.attribute.findMany({
      where: {
        id: {
          in: filter.attribute_ids,
        },
      },
      include: {
        telemetry: {
          where: {
            createdAt: {
              lte: filter.date_to,
              gte: filter.date_from,
            },
          },
        },
      },
    });

    return data.map((t) => {
      return {
        attribute_id: t.attributeId,
        value: t.value,
        createdAt: t.createdAt,
      };
    });
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
