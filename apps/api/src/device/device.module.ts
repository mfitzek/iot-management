import { DeviceManager } from './device.manager.service';
import { PrismaModule } from './../prisma/prisma.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { TelemetryModule } from '@iot/telemetry';
import { GatewayMqttModule, MqttService } from '@iot/gateway/mqtt';

@Module({
  controllers: [DeviceController],
  providers: [DeviceService, DeviceManager],
  imports: [PrismaModule, AuthModule, TelemetryModule, GatewayMqttModule],
})
export class DeviceModule {

  constructor(mqtt: MqttService){
    mqtt.createClient({server: "mqtt://localhost:1883"}).subscribe("test", (topic, data)=>{
      console.log(`(${topic})=> ${data}`);
    });
  }

}
