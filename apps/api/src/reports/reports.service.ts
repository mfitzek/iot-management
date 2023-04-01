import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserReports(userId: string) {
    return this.prisma.report.findMany({
      where: { userId: userId },
      include: {
        attributes: {
          include: { attribute: true, device: true },
        },
      },
    });
  }
}
