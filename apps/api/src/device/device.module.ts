import { DeviceManager } from './device.manager.service';
import { PrismaModule } from './../prisma/prisma.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';

@Module({
  controllers: [DeviceController],
  providers: [DeviceService, DeviceManager],
  imports: [PrismaModule, AuthModule],
})
export class DeviceModule {}
