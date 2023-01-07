import { AdminsitrationService } from './administation.service';
import { Statistics } from '@iot/administration';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('administration')
export class AdministrationController {
  constructor(private statisticsProvider: AdminsitrationService) {}

  @Get('statistics')
  async getStatistics(): Promise<Statistics> {
    return await this.statisticsProvider.databaseStatistics();
  }
}
