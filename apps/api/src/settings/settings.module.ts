import { Module } from '@nestjs/common';
import { ConfiguratioProvider } from './settings-provider.service';
import { SettingsController } from './settings.controller';

@Module({
  controllers: [SettingsController],
  exports: [ConfiguratioProvider],
  providers: [ConfiguratioProvider],
})
export class SettingsModule {}
