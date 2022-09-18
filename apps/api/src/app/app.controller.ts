import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

import { IDeviceListRow } from '@iot/device';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('devices')
  getDevices() {
    const rows: IDeviceListRow[] = [
      {
        id: 100,
        name: 'Test',
        type: 'X752-AB',
        last_data: '12.09.2022 13:52',
        status: 'online',
      },
      {
        id: 101,
        name: 'Test2',
        type: 'S3X-BD',
        last_data: '12.09.2022 10:52',
        status: 'warning',
      },
      {
        id: 102,
        name: 'Test3',
        type: 'S3X-CMD',
        last_data: '01.08.2022 07:52',
        status: 'error',
      },
    ];
    return rows;
  }
}
