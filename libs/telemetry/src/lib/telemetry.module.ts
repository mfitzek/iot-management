import { Module } from '@nestjs/common';
import { MainTelemetryCollector } from './MainTelemetryCollector';

@Module({
  controllers: [],
  providers: [MainTelemetryCollector],
  exports: [MainTelemetryCollector],
})
export class TelemetryModule {}
