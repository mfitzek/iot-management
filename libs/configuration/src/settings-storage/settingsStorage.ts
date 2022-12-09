import { Settings } from '../dataObjects';

export interface SettingsStorage {
  saveSettings(settings: Settings): Promise<boolean>;
  getSettings(): Promise<Settings>;
}
