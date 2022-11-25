import { TelemetryModule } from '@iot/telemetry';
import { Module } from '@nestjs/common';
import { TelemetryController } from './telemetr.controller';

@Module({
  controllers: [TelemetryController],
  providers: [],
  imports: [TelemetryModule],
})
export class TelemetryAPIModule {}
