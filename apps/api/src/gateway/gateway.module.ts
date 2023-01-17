import { Module } from '@nestjs/common';
import { HttpGatewayModule } from './http-gateway/http-gateway.module';

@Module({
  imports: [HttpGatewayModule],
})
export class GatewayModule {}
