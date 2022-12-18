import { SettingsModule } from './../settings/settings.module';
import { TelemetryCollectorModule } from './../telemetry-collector/collector.module';
import { DeviceManager } from './device-manager.service';
import { PrismaModule } from './../prisma/prisma.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';

import { GatewayMqttModule } from '@iot/gateway/mqtt';

@Module({
  controllers: [DeviceController],
  providers: [DeviceService, DeviceManager],
  exports: [DeviceManager],
  imports: [PrismaModule, AuthModule, TelemetryCollectorModule, GatewayMqttModule, SettingsModule],
})
export class DeviceModule {}
