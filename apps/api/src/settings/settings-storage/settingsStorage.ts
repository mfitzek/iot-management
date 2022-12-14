import { Settings } from '@iot/configuration';

export interface SettingsStorage {
  saveSettings(settings: Settings): Promise<boolean>;
  getSettings(): Promise<Settings | undefined>;
}
