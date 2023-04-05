import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReportData, ReportSettings } from '@iot/reports';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

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
}
