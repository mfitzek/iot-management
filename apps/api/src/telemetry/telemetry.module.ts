import { Module } from '@nestjs/common';
import { TelemetryController } from './telemetr.controller';

@Module({
  controllers: [TelemetryController],
  providers: [],
})
export class TelemetryAPIModule {}
