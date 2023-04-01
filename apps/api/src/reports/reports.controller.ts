// generate nest controller
// Path: apps\api\src\reports\reports.controller.ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ReportService } from './reports.service';

@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private reports: ReportService) {}

  @Get()
  getUserReports(@Req() req) {
    return this.reports.getUserReports(req.user.id);
  }
}
