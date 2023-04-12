import { Module } from '@nestjs/common';
import { GmailMailService } from './mail.service';
import { SettingsModule } from '../settings/settings.module';
import { Logger } from '@iot/logger';
import { UserModule } from '../user/user.module';

@Module({
  imports: [SettingsModule, UserModule],
  providers: [GmailMailService],
  exports: [GmailMailService],
})
export class MailModule {
  constructor(private mailService: GmailMailService) {
    Logger.instance.info('Mail module initialized');
  }
}
