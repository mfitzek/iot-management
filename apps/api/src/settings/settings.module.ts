import { BackupController } from './backup/backup.controller';
import { BackupService } from './backup/backup.service';
import { Module } from '@nestjs/common';
import { ConfiguratioProvider } from './settings-provider.service';
import { SettingsController } from './settings.controller';

@Module({
  controllers: [SettingsController, BackupController],
  exports: [ConfiguratioProvider, BackupService],
  providers: [ConfiguratioProvider, BackupService],
})
export class SettingsModule {}
