import { TelemetryCollectorService } from './collector.service';

import { Module } from '@nestjs/common';
import { SettingsModule } from '../settings/settings.module';

@Module({
  imports: [SettingsModule],
  providers: [TelemetryCollectorService],
  exports: [TelemetryCollectorService],
})
export class TelemetryCollectorModule {}
