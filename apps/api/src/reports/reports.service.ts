import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AttributeData, ReportData, ReportSettings } from '@iot/reports';
import { TelemetryCollectorService } from '../telemetry-collector';

@Injectable()
export class ReportService {
  constructor(
    private readonly prisma: PrismaService,
    private telemetry: TelemetryCollectorService
  ) {}

  public async getAllReportsForMail() {
    const reports = await this.prisma.report.findMany({
      where: { sendEmail: true },
      include: {
        attributes: true,
        user: true,
      },
    });

    return reports.map((report) => {
      return {
        id: report.id,
        name: report.name,
        userEmail: report.user.email,
        intervalMs: Number(report.intervalMs),
        sendEmail: report.sendEmail,
        lastSent: report.lastSent,
        attributes: report.attributes,
      };
    });
  }

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
        intervalMs: Number(report.intervalMs),
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
        intervalMs: Number(report.intervalMs),
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
        intervalMs: Number(reportToUpdate.intervalMs),
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
        attributes: {
          include: { attribute: { include: { device: true } } },
        },
      },
    });

    const start = Date.now() - Number(report.intervalMs);

    const attributes = report.attributes.map((attribute) => attribute.attributeId);
    const telemetry = await this.telemetry.getTelemetry({
      attribute_ids: attributes,
      date_from: new Date(start),
    });

    const data: AttributeData[] = [];

    for (const attribute of report.attributes) {
      const records = telemetry.filter((record) => record.attribute_id === attribute.attributeId);
      const values = records.map((record) => Number(record.value)).filter((value) => !isNaN(value));

      data.push({
        device: attribute.attribute.device.name,
        attribute: attribute.attribute.name,
        max: Math.max(...values),
        min: Math.min(...values),
        avg: values.reduce((a, b) => a + b, 0) / Math.max(values.length, 1),
        records: records.length,
      });
    }
    return data;
  }

  public async updateLastSent(reportId: string, timestamp: Date) {
    await this.prisma.report.update({
      where: { id: reportId },
      data: { lastSent: timestamp },
    });
  }
}
