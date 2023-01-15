import { CreateDevice, DeviceData } from '@iot/device';
import { IUser } from '@iot/user';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { DeviceManager } from './device-manager.service';
import { DeviceService } from './device.service';

@UseGuards(JwtAuthGuard)
@Controller('device')
export class DeviceController {
  constructor(private devices: DeviceService, private device_manager: DeviceManager) {}

  @Get('list')
  getDevices(@Req() req) {
    return this.device_manager.getUserDeviceList(req.user.id);
  }

  @Put('create')
  createDevice(@Req() req, @Body() data: CreateDevice) {
    const user: IUser = req.user;
    return this.device_manager.createDevice({
      name: data.name,
      type: data.type,
      owner_id: user.id,
    });
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
  async updateDevice(@Req() req, @Param() params, @Body() data: DeviceData) {
    const device = await this.device_manager.getUserDevice(params.id, req.user.id);
    if (!device) throw new NotFoundException();
    return device.update(data);
  }

  @Delete(':id')
  async deleteDevice(@Req() req, @Param() params) {
    const removed = await this.device_manager.removeUserDevice(params.id, req.user.id);
    return removed;
  }
}
