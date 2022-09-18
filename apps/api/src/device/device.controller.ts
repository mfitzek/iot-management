import { Controller, Get } from '@nestjs/common';
import { IDeviceListRow } from '@iot/device';

@Controller('device')
export class DeviceController {
  @Get('list')
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
      {
        id: 103,
        name: 'Yum',
        type: '3XC-XYZ',
        last_data: '18.09.2022 20:52',
        status: 'online',
      },
    ];
    return rows;
  }
}
