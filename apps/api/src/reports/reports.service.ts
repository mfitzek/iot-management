import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReportData, ReportSettings } from '@iot/reports';
import { TelemetryCollectorService } from '../telemetry-collector';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService, private telemetry: TelemetryCollectorService ) {}

  async getUserReports(userId: string): Promise<ReportData[]> {
    const reports = await this.prisma.report.findMany({
      where: { userId: userId },
      include: {
        attributes: {
          include: { attribute: { include: { device: true } } },
        },
      },
    });

    return reports.map((report) => {
      return {
        id: report.id,
        name: report.name,
        intervalMs: report.intervalMs,
        sendEmail: report.sendEmail,
        attributes: report.attributes.map((attribute) => {
          return {
            id: attribute.attributeId,
            device: attribute.attribute.device.name,
            name: attribute.attribute.name,
          };
        }),
      };
    });
  }

  async createReport(userId: string, report: ReportSettings) {
    const newReport = await this.prisma.report.create({
      data: {
        name: report.name,
        intervalMs: report.intervalMs,
        sendEmail: report.sendEmail,
        userId: userId,
        attributes: {
          create: report.attributes.map((attribute) => {
            return {
              attributeId: attribute,
            };
          }),
        },
        lastSent: new Date(),
      },
    });

    return newReport;
  }

  async updateReport(userId: string, reportId: string, reportToUpdate: ReportSettings) {
    const createAttributes = reportToUpdate.attributes.map((attribute) => {
      return {
        attributeId: attribute,
      };
    });

    const updatedReport = await this.prisma.report.update({
      where: { id: reportId },
      data: {
        name: reportToUpdate.name,
        intervalMs: reportToUpdate.intervalMs,
        sendEmail: reportToUpdate.sendEmail,
        attributes: {
          deleteMany: {},
          create: createAttributes,
        },
      },
    });

    return updatedReport;
  }

  async deleteReport(userId: string, reportId: string) {
    const deleted = await this.prisma.report.deleteMany({
      where: { userId: userId, id: reportId },
    });

    return deleted.count > 0;
  }

  async getReportData(userId: string, reportId: string) {
    const report = await this.prisma.report.findUnique({
      where: { id: reportId },
      include: {
        attributes: true
      }
    });

    const start = Date.now() - report.intervalMs;

    const attributes = report.attributes.map((attribute) => attribute.attributeId);
    const telemetry = await this.telemetry.getTelemetry({
      attribute_ids: attributes,
      date_from: new Date(start)
    });


  }
}
