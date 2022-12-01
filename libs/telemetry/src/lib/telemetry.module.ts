import { Module } from '@nestjs/common';
import { CacheTelemetryCollector } from './CacheTelemetryCollector';

@Module({
  controllers: [],
  providers: [CacheTelemetryCollector],
  exports: [CacheTelemetryCollector],
})
export class TelemetryModule {}
