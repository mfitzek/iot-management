import { Observable, Observer } from '@iot/utility';
import { Injectable } from '@nestjs/common';
import { Settings } from '@iot/configuration';
import { JsonSettingsStorage } from './settings-storage/jsonSettingsStorage';
import { SettingsStorage } from './settings-storage/settingsStorage';

@Injectable()
export class ConfigurationProvider implements Observable {
  private settings?: Settings;
  private storage: SettingsStorage;

  private observers: Set<Observer>;

  constructor() {
    this.storage = new JsonSettingsStorage();
    this.observers = new Set<Observer>();
  }
  notify(): void {
    this.observers.forEach((obs) => {
      obs.onUpdate();
    });
  }
  register(observer: Observer): void {
    this.observers.add(observer);
  }
  unregister(observer: Observer): void {
    this.observers.delete(observer);
  }

  public async getSettings(): Promise<Settings> {
    if (!this.settings) {
      this.settings = await this.getSettingsFromStorageOrCreateNew();
    }
    return { ...this.settings };
  }

  public async saveSettings(settings: Settings) {
    this.settings = settings;
    this.notify();
    await this.storage.saveSettings(settings);
  }

  private async getSettingsFromStorageOrCreateNew() {
    const storedSettings = await this.storage.getSettings();
    if (storedSettings) {
      return storedSettings;
    }
    return this.getDefaultConfig();
  }

  private getDefaultConfig() {
    console.log('ConfigurationProvider.getDefaultConfig');

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
