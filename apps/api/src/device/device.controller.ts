import {
  Controller,
  Get,
  UseGuards,
  Req,
  Body,
  Put,
  Param,
  Post,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ICreateDevicePost } from '@iot/device';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { DeviceService } from './device.service';
import { DeviceManager } from './device.manager.service';

@UseGuards(JwtAuthGuard)
@Controller('device')
export class DeviceController {
  constructor(
    private devices: DeviceService,
    private device_manager: DeviceManager
  ) {}

  @Get('list')
  getDevices(@Req() req) {
    return this.device_manager.getUserDeviceList(req.user.id);
  }

  @Put('create')
  createDevice(@Req() req, @Body() data: ICreateDevicePost) {
    return this.devices.createDevice({ user_id: req.user.id, ...data });
  }

  @Get(':id')
  async getDevice(@Req() req, @Param() params) {
    const device = await this.devices.getDevice(params.id);
    if (device?.owner_id === req.user.id) {
      return device;
    }
    return { message: 'Not found' };
  }

  @Post(':id')
  async updateDevice(@Req() req, @Param() params) {
    const device = await this.device_manager.getUserDevice(
      params.id,
      req.user.id
    );

    if (!device) throw new NotFoundException();

    device.update({});
    return device.getData();
  }

  @Delete(':id')
  async deleteDevice(@Req() req, @Param() params) {
    const removed = await this.device_manager.removeUserDevice(
      params.id,
      req.user.id
    );
    return removed;
    // TODO: return some message with status code depending on removed
  }
}
