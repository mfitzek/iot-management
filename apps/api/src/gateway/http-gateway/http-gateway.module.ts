import { HttpGatewayService } from './http-gateway.service';
import { Module } from '@nestjs/common';
import { HttpGatewayController } from './http-gateway.controller';

@Module({
  providers: [HttpGatewayService],
  controllers: [HttpGatewayController],
  exports: [HttpGatewayService],
})
export class HttpGatewayModule {}
