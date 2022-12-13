import { Module } from '@nestjs/common';
import { ConfiguratioProvider } from '@iot/configuration';
import { SettingsController } from './settings.controller';

@Module({
  controllers: [SettingsController],
  providers: [ConfiguratioProvider],
})
export class SettingsModule {}
