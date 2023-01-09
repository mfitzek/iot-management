import { PrismaModule } from './../prisma/prisma.module';
import { AdminsitrationService } from './administation.service';
import { AdministrationController } from './administration.controller';
import { Module } from '@nestjs/common';
import { SettingsModule } from '../settings/settings.module';

@Module({
  controllers: [AdministrationController],
  providers: [AdminsitrationService],
  imports: [SettingsModule, PrismaModule],
})
export class AdministritonModule {}
