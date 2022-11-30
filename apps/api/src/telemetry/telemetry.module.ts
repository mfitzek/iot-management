import { TelemetryModule } from '@iot/telemetry';
import { Module } from '@nestjs/common';
import { TelemetryController } from './telemetr.controller';
import { TelemetryService } from './telemetry.service';

@Module({
  controllers: [TelemetryController],
  providers: [TelemetryService],
  imports: [TelemetryModule],
})
export class TelemetryAPIModule {}
