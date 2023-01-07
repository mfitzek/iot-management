import { Statistics } from '@iot/administration';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('administration')
export class AdministrationController {
  @Get('statistics')
  async getStatistics(): Promise<Statistics> {
    const stats: Statistics = {
      users: Math.round(Math.random() * 50),
      devices: Math.round(Math.random() * 200),
      records: Math.round(Math.random() * 1_000_000),
      currentSizeMB: Math.round(Math.random() * 500),
      maxSizeMB: Math.round(Math.random() * 1000),
    };
    return stats;
  }
}
