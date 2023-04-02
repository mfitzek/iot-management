import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReportData } from '@iot/reports';

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
            id: attribute.id,
            device: attribute.attribute.device.name,
            name: attribute.attribute.name,
          };
        }),
      };
    });
  }
}
