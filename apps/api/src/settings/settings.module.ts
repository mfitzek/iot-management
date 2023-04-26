import { BackupController } from './backup/backup.controller';
import { BackupService } from './backup/backup.service';
import { Module } from '@nestjs/common';
import { ConfigurationProvider } from './settings-provider.service';
import { SettingsController } from './settings.controller';

@Module({
  controllers: [SettingsController, BackupController],
  exports: [ConfigurationProvider, BackupService],
  providers: [ConfigurationProvider, BackupService],
})
export class SettingsModule {}
