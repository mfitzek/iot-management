import { Controller, Get, UseGuards, Req, Body, Put } from '@nestjs/common';
import { ICreateDevicePost } from '@iot/device';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { DeviceService } from './device.service';

@UseGuards(JwtAuthGuard)
@Controller('device')
export class DeviceController {
  constructor(private devices: DeviceService) {}

  @Get('list')
  getDevices(@Req() req) {
    return this.devices.getDeviceList(req.user.id);
  }

  @Put('create')
  createDevice(@Req() req, @Body() data: ICreateDevicePost) {
    return this.devices.createDevice({ user_id: req.user.id, ...data });
  }
}
