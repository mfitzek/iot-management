import { Statistics } from '@iot/administration';
import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { UserStats } from '@iot/administration';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { AdminsitrationService } from './administation.service';
import { Log, Logger } from '@iot/logger';

@UseGuards(JwtAuthGuard)
@Controller('administration')
export class AdministrationController {
  constructor(private statisticsProvider: AdminsitrationService) {}

  @Get('statistics')
  async getStatistics(): Promise<Statistics> {
    return await this.statisticsProvider.databaseStatistics();
  }

  @Get('users')
  async getUsers(): Promise<UserStats[]> {
    return await this.statisticsProvider.usersStats();
  }

  @Get('logs')
  async getLogs(): Promise<Log[]> {
    return [...Logger.instance.getLogs()];
  }
}
