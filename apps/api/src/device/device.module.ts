import { PrismaModule } from './../prisma/prisma.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';

@Module({
  controllers: [DeviceController],
  providers: [DeviceService],
  imports: [PrismaModule, AuthModule],
})
export class DeviceModule {}
