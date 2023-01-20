import { Module } from '@nestjs/common';
import { AdministritonModule } from './../administration/administration.module';
import { AuthModule } from './../auth/auth.module';
import { DeviceModule } from './../device/device.module';
import { GatewayModule } from './../gateway/gateway.module';

import { SettingsModule } from '../settings/settings.module';
import { TelemetryModule } from '../telemetry/telemetry.module';

@Module({
  imports: [
    DeviceModule,
    AuthModule,
    TelemetryModule,
    SettingsModule,
    AdministritonModule,
    GatewayModule,
  ],
})
export class AppModule {}
