import { Injectable } from '@nestjs/common';
import { DeviceService } from './device.service';

@Injectable()
export class DeviceManager {
  constructor(private devices: DeviceService) {
    this.initDevices();
  }

  async initDevices() {
    // TODO: initialize all devices
  }
}
