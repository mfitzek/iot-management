import { CreateDevice, CustomRequestMethod, DeviceStatusInfo, UpdateDevice } from '@iot/device';
import { IUser, UserRole } from '@iot/user';
import {
  BadRequestException,
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
import { Roles } from '../auth/decorators/role.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('devices')
export class DeviceController {
  constructor(private devices: DeviceService, private device_manager: DeviceManager) {}

  @Get()
  getDevices(@Req() req) {
    return this.device_manager
      .getUserDevices(req.user.id)
      .then((devices) => devices.map((d) => d.getData()));
  }

  @Get('status')
  async getDevicesShort(@Req() req): Promise<DeviceStatusInfo[]> {
    const devices = await this.device_manager.getUserDevices(req.user.id);
    return Promise.all(devices.map((device) => device.getShortInfo()));
  }

  @Roles(UserRole.ADMIN)
  @Get('status/admin')
  async getDeviceShortAdmin(@Req() req): Promise<DeviceStatusInfo[]> {
    const devices = await this.device_manager.getAllDevices();
    return Promise.all(devices.map((device) => device.getShortInfo()));
  }

  @Get('dashboard')
  async getDeviceDashboardData(@Req() req) {
    return this.devices.getDeviceDashboardData(req.user.id);
  }

  @Put()
  createDevice(@Req() req, @Body() data: CreateDevice) {
    const user: IUser = req.user;
    return this.device_manager
      .createDevice({
        name: data.name,
        type: data.type,
        owner_id: user.id,
      })
      .then((device) => device.getData());
  }

  @Get(':id')
  async getDevice(@Req() req, @Param() params) {
    const device = await this.device_manager.getUserDevice(params.id, req.user.id);
    if (device) {
      return device.getData();
    }

    return { message: 'Not found' };
  }

  @Post(':id')
  async updateDevice(@Req() req, @Param() params, @Body() data: UpdateDevice) {
    const device = await this.device_manager.getUserDevice(params.id, req.user.id);
    if (!device) throw new NotFoundException();
    return device.update(data);
  }

  @Delete(':id')
  async deleteDevice(@Req() req, @Param() params) {
    const removed = await this.device_manager.removeUserDevice(params.id, req.user.id);
    return removed;
  }

  @Post(':id/copy')
  async copyDevice(@Req() req, @Param() params, @Body() data: { name: string }) {
    const user: IUser = req.user;
    const clone = await this.device_manager.copyDevice(params.id, user.id, data.name);
    if (clone) return clone.getData();
    else throw new BadRequestException("Can't copy device");
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
