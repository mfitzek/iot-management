import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportService } from './reports.service';
import { PrismaModule } from '../prisma/prisma.module';
import { TelemetryCollectorModule } from '../telemetry-collector';
import { MailingReports } from './mailing-reports';
import { MailModule } from '../mailing/mail.module';

// generate nest module
@Module({
  controllers: [ReportsController],
  providers: [ReportService, MailingReports],
  imports: [PrismaModule, TelemetryCollectorModule, MailModule],
})
export class ReportsModule {
  constructor(private mailingReports: MailingReports) {
    const hourMs = 1000 * 60 * 60;
    this.mailingReports.mailAllReports();
    setInterval(() => this.mailingReports.mailAllReports(), hourMs);
  }
}
