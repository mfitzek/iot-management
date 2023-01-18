import { CreateDevice, CustomRequestMethod, DeviceData, DeviceStatusInfo } from '@iot/device';
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
  Query,
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

  @Get('shortlist')
  async getDevicesShort(@Req() req): Promise<DeviceStatusInfo[]> {
    const devices = await this.device_manager.getUserDevices(req.user.id);
    return devices.map((device) => device.getShortInfo());
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

  @Get(':id/custom/')
  async getCustomRoute(
    @Req() req,
    @Param('id') id: string,
    @Query('path') customRoute: string,
    @Body() data: object
  ) {
    console.log('Custom request', { id, customRoute, method: CustomRequestMethod.GET, data });
    const device = await this.device_manager.getUserDevice(id, req.user.id);
    if (!device) throw new NotFoundException();
    const result = device.handleCustomRoute({
      path: customRoute,
      method: CustomRequestMethod.GET,
      body: data,
    });

    return result;
  }

  @Post(':id/custom/')
  async postCustomRoute(
    @Req() req,
    @Param('id') id: string,
    @Query('path') customRoute: string,
    @Body() data: object
  ) {
    console.log('Custom request', { id, customRoute, method: CustomRequestMethod.POST, data });
    const device = await this.device_manager.getUserDevice(id, req.user.id);
    if (!device) throw new NotFoundException();
    const result = await device.handleCustomRoute({
      path: customRoute,
      method: CustomRequestMethod.POST,
      body: data,
    });

    return result;
  }
}
