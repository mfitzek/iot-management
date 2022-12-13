import { Settings } from '../dataObjects';
import { SettingsStorage } from './settingsStorage';

import { writeFile, readFile } from 'fs/promises';

export class JsonSettingsStorage implements SettingsStorage {
  filePath = '../../../../settings.json';

  async saveSettings(settings: Settings): Promise<boolean> {
    const jsonString = JSON.stringify(settings);
    try {
      await writeFile(this.filePath, jsonString);
    } catch (error) {
      return false;
    }
    return true;
  }
  async getSettings(): Promise<Settings> {
    try {
      const fileBuffer = await readFile(this.filePath);
      const settings = JSON.parse(fileBuffer.toString());
      return settings as Settings;
    } catch (error) {
      return undefined;
    }
  }
}
