// generate nest controller
// Path: apps\api\src\reports\reports.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ReportService } from './reports.service';

import { ReportSettings } from '@iot/reports';

@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private reports: ReportService) {}

  @Get()
  getUserReports(@Req() req) {
    return this.reports.getUserReports(req.user.id);
  }

  @Post()
  async createReport(@Req() req, @Body() body: ReportSettings) {
    const { id } = await this.reports.createReport(req.user.id, body);
    return (await this.reports.getUserReports(req.user.id)).find((report) => report.id === id);
  }

  @Post(':id')
  async updateReport(@Req() req, @Param('id') id: string, @Body() body: ReportSettings) {
    return await this.reports.updateReport(req.user.id, id, body);
  }

  @Delete(':id')
  async deleteReport(@Req() req, @Param('id') id: string) {
    return await this.reports.deleteReport(req.user.id, id);
  }

  @Get(':id/data')
  async getReportData(@Req() req, @Param('id') id: string) {
    return await this.reports.getReportData(req.user.id, id);
  }
}
