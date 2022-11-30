import { ISearchTelemetry } from '@iot/telemetry';
import { IUser } from '@iot/user';
import { Controller, Get, UseGuards, Req, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { TelemetryService } from './telemetry.service';

// @UseGuards(JwtAuthGuard)
@Controller('telemetry')
export class TelemetryController {
  constructor(private telemetry: TelemetryService) {}

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
      attribute_ids: attributesIds ?? [],
      date_from: searchFrom,
      date_to: searchTo,
    };

    // const user: IUser = req.user;
    // console.log(user.id, search);

    return await this.telemetry.getTelemetry(search);
  }
}
