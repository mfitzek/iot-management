import { AuthModule } from './../auth/auth.module';
import { DeviceModule } from './../device/device.module';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DeviceModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
