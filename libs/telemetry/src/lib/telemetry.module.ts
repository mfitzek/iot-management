import { Module } from '@nestjs/common';
import { CacheTelemetryCollector } from './telemetry.service';

@Module({
  controllers: [],
  providers: [CacheTelemetryCollector],
  exports: [CacheTelemetryCollector],
})
export class TelemetryModule {}
