import { ITelemetry } from './../interface/ITelemetry';
import { ISearchTelemetry } from '../interface/IApi';
import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { ITelemetryService } from '../interface/ITelemetryService';

@Injectable()
export class TelemetryService implements ITelemetryService {
  private telemetry: ITelemetry[] = [];
  private prisma = new PrismaClient();

  async getTelemetry(filter: ISearchTelemetry): Promise<ITelemetry[]> {
    // const attributesWithData = await this.prisma.attribute.findMany({
    //   where: {
    //     id: {
    //       in: filter.attribute_ids,
    //     },
    //   },
    //   include: {
    //     telemetry: {
    //       where: {
    //         createdAt: {
    //           lte: filter.date_to,
    //           gte: filter.date_from,
    //         },
    //       },
    //     },
    //   },
    // });

    // const result: IAttributeTelemetry[] = attributesWithData.map(attr=>{
    //   return {
    //     ...attr,
    //     telemetry: attr.telemetry.map((t) => {
    //       return {
    //         attribute_id: t.attributeId,
    //         value: t.value,
    //         createdAt: t.createdAt,
    //       };
    //     })
    //   }
    // });

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
