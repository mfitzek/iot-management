import { Controller, Get, UseGuards, Req, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

// @UseGuards(JwtAuthGuard)
@Controller('telemetry')
export class TelemetryController {
  @Get()
  async getTelemetry(@Req() req, @Query('attr') attributesIds: string[]) {
    return attributesIds;
  }
}
