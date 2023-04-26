import { TelemetryCollectorService } from './collector.service';

import { Module } from '@nestjs/common';
import { SettingsModule } from '../settings/settings.module';
import { CacheWriter } from './cache/cache-writer';
import { CacheTelemetryCollector } from './cache-telemetry-collector';
import { DatabaseTelemetryCollector } from './database-telemetry-collector';

@Module({
  imports: [SettingsModule],
  providers: [
    TelemetryCollectorService,
    CacheWriter,
    CacheTelemetryCollector,
    DatabaseTelemetryCollector,
  ],
  exports: [TelemetryCollectorService],
})
export class TelemetryCollectorModule {}
