import { AccessResult, RequestData, TelemetryData } from '@iot/gateway/http';
import {
  Body,
  Controller,
  Param,
  Post,
  Headers,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpGatewayService } from './http-gateway.service';

@Controller('gateway')
export class HttpGatewayController {
  constructor(private gatewayService: HttpGatewayService) {}

  @Post(':id')
  async telemetry(
    @Param('id') id: string,
    @Body() body: unknown,
    @Headers('Authorization') token: string
  ) {
    if (typeof body !== 'object') return new BadRequestException();
    const telemetry: TelemetryData[] = [];
    for (const [key, value] of Object.entries(body)) {
      telemetry.push({
        attributeName: key,
        value: String(value),
      });
    }
    const data: RequestData = {
      accessToken: token,
      telemetry: telemetry,
    };

    const result = this.gatewayService.onTelemetry(id, data);

    if (result === AccessResult.Success) return 'ok';

    return new UnauthorizedException();
  }
}
