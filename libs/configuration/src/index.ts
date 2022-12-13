import { Injectable } from '@nestjs/common';
import { Settings } from './dataObjects';
import { JsonSettingsStorage } from './settings-storage/jsonSettingsStorage';
import { SettingsStorage } from './settings-storage/settingsStorage';

@Injectable()
export class ConfiguratioProvider {
  private settings?: Settings;
  private storage: SettingsStorage;

  constructor() {
    this.storage = new JsonSettingsStorage();
  }

  public async getSettings(): Promise<Settings> {
    if (!this.settings) {
      this.settings = await this.getSettingsFromStorageOrCreateNew();
    }
    return { ...this.settings };
  }

  public async saveSettings(settings: Settings) {
    this.settings = settings;
    await this.storage.saveSettings(settings);
  }

  private async getSettingsFromStorageOrCreateNew() {
    const storagedSettings = await this.storage.getSettings();
    if (storagedSettings) {
      return storagedSettings;
    }
    return this.getDefaultConfig();
  }

  private getDefaultConfig() {
    const config: Settings = {
      database: {
        maxDatabaseSizeMB: 4000,
      },
      telemetryCache: {
        maxNumberOfRecords: 100,
        cacheTimeoutMs: 5 * 60 * 1000,
      },
    };
    return config;
  }
}

export * from './dataObjects';
