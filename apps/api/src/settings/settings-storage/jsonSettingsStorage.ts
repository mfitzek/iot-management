import { Settings } from '@iot/configuration';
import { SettingsStorage } from './settingsStorage';

import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

export class JsonSettingsStorage implements SettingsStorage {
  filePath = '../../../settings.json';
  absPath = join(__dirname, this.filePath);

  async saveSettings(settings: Settings): Promise<boolean> {
    const jsonString = JSON.stringify(settings);
    try {
      await writeFile(this.absPath, jsonString);
    } catch (error) {
      console.log(error);

      return false;
    }
    return true;
  }
  async getSettings(): Promise<Settings | undefined> {
    try {
      const fileBuffer = await readFile(this.absPath);
      const settings = JSON.parse(fileBuffer.toString());
      return settings as Settings;
    } catch (error) {
      return undefined;
    }
  }
}
