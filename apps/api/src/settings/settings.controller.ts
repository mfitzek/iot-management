import { ConfigurationProvider } from './settings-provider.service';

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Settings } from '@iot/configuration';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('settings')
export class SettingsController {
  constructor(private configProvider: ConfigurationProvider) {}

  @Get()
  public async getSetting() {
    const settings = await this.configProvider.getSettings();
    return settings;
  }

  @Post()
  public async updateSettings(@Body() settings: Settings) {
    await this.configProvider.saveSettings(settings);
    return await this.configProvider.getSettings();
  }
}
