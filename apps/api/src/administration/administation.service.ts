import { PrismaService } from './../prisma/prisma.service';
import { ConfiguratioProvider } from './../settings/settings-provider.service';
import { Statistics, UserStats } from '@iot/administration';
import { Injectable, Query } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import { UserRole } from '@iot/user';
import { Monitor } from '@iot/monitor';

@Injectable()
export class AdminsitrationService {
  constructor(private configuration: ConfiguratioProvider, private prisma: PrismaService) {}

  async databaseStatistics(): Promise<Statistics> {
    const { users, devices, records } = await this.databaseRecords();
    const cacheMonitorStats = Monitor.instance.getCacheStats();
    const stats: Statistics = {
      users: users,
      devices: devices,
      records: records,
      currentSizeMB: await this.dbFileSize(),
      maxSizeMB: (await this.configuration.getSettings()).database.maxDatabaseSizeMB,
      cache: {
        cacheWrites: cacheMonitorStats.cacheWrites,
        databaseWrites: cacheMonitorStats.databaseWrites,
      },
    };
    return stats;
  }

  async databaseRecords() {
    const users = await this.prisma.user.count();
    const devices = await this.prisma.device.count();
    const records = await this.prisma.telemetry.count();
    return { users, devices, records };
  }
  async dbFileSize() {
    const db_url = process.env.DATABASE_URL;
    const filename = db_url.split(':')[1];
    const p = path.join('prisma/', filename);
    const { size } = await fs.promises.stat(p);
    return size / (1024 * 1024);
  }

  async usersStats(): Promise<UserStats[]> {
    const query = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        Device: {
          select: {
            Attribute: {
              select: {
                _count: {
                  select: {
                    telemetry: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const result: UserStats[] = [];

    for (const user of query) {
      let records = 0;

      for (const device of user.Device) {
        for (const attr of device.Attribute) {
          records += attr._count.telemetry;
        }
      }

      result.push({
        id: user.id,
        username: user.username,
        email: user.email,
        devices: user.Device.length,
        records: records,
        role: UserRole.USER,
      });
    }

    return result;
  }
}
