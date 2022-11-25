import { ISearchTelemetry } from '@iot/telemetry';
import { Controller, Get, UseGuards, Req, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

// @UseGuards(JwtAuthGuard)
@Controller('telemetry')
export class TelemetryController {
  @Get()
  async getTelemetry(
    @Req() req,
    @Query('attr') attributesIds: string[],
    @Query('start') dateFrom: string,
    @Query('end') dateTo: string
  ) {
    const dateFromNum = Number(dateFrom);
    const dateToNum = Number(dateTo);

    let searchFrom: Date | undefined = new Date(dateFromNum);
    let searchTo: Date | undefined = new Date(dateToNum);

    if (isNaN(searchFrom.getDate())) {
      searchFrom = undefined;
    }
    if (isNaN(searchTo.getDate())) {
      searchTo = undefined;
    }

    const search: ISearchTelemetry = {
      attribute_ids: attributesIds,
      date_from: searchFrom,
      date_to: searchTo,
    };

    return {
      attributesIds,
      searchFrom,
      searchTo,
    };
  }
}
