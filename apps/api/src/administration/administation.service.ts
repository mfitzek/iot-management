import { ConfiguratioProvider } from './../settings/settings-provider.service';
import { Statistics } from '@iot/administration';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminsitrationService {
  constructor(private configuration: ConfiguratioProvider) {}

  async databaseStatistics(): Promise<Statistics> {
    const stats: Statistics = {
      users: Math.round(Math.random() * 50),
      devices: Math.round(Math.random() * 200),
      records: Math.round(Math.random() * 1_000_000),
      currentSizeMB: Math.round(Math.random() * 500),
      maxSizeMB: (await this.configuration.getSettings()).database.maxDatabaseSizeMB,
    };
    return stats;
  }
}
