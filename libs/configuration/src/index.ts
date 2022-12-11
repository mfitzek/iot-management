import { Injectable } from '@nestjs/common';
import { Settings } from './dataObjects';
import { JsonSettingsStorage } from './settings-storage/jsonSettingsStorage';
import { SettingsStorage } from './settings-storage/settingsStorage';

@Injectable()
export class Configuration {
  private settings?: Settings;
  public storage: SettingsStorage;

  constructor() {
    this.storage = new JsonSettingsStorage();
  }

  public async getSettings(): Promise<Settings> {
    if (!this.settings) {
      this.settings = await this.storage.getSettings();
    }
    return { ...this.settings };
  }

  public async saveSettings(settings: Settings) {
    this.settings = settings;
    await this.storage.saveSettings(settings);
  }
}
