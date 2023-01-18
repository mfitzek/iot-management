import { Module } from '@nestjs/common';
import { HttpGatewayModule } from './http-gateway/http-gateway.module';
import { MqttGatewayModule } from './mqtt-gateway/gateway-mqtt.module';

@Module({
  exports: [HttpGatewayModule, MqttGatewayModule],
  imports: [HttpGatewayModule, MqttGatewayModule],
})
export class GatewayModule {}
