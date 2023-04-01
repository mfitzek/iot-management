import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportService } from './reports.service';
import { PrismaModule } from '../prisma/prisma.module';

// generate nest module
@Module({
  controllers: [ReportsController],
  providers: [ReportService],
  imports: [PrismaModule],
})
export class ReportsModule {}
