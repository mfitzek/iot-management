import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportService } from './reports.service';
import { PrismaModule } from '../prisma/prisma.module';
import { TelemetryCollectorModule } from '../telemetry-collector';

// generate nest module
@Module({
  controllers: [ReportsController],
  providers: [ReportService],
  imports: [PrismaModule, TelemetryCollectorModule],
})
export class ReportsModule {}
