import { GatewayModule } from './../gateway/gateway.module';
import { AdministritonModule } from './../administration/administration.module';
import { AuthModule } from './../auth/auth.module';
import { DeviceModule } from './../device/device.module';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelemetryModule } from '../telemetry/telemetry.module';
import { SettingsModule } from '../settings/settings.module';

@Module({
  imports: [
    DeviceModule,
    AuthModule,
    TelemetryModule,
    SettingsModule,
    AdministritonModule,
    GatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
