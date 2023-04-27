import { UserService } from './../user/user.service';
import { Observer } from '@iot/utility';
import { Injectable } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';
import { ConfigurationProvider } from '../settings/settings-provider.service';
import { MailOptions, MailService } from '@iot/mailing';
import { Logger } from '@iot/logger';

@Injectable()
export class GmailMailService implements Observer, MailService {
  private transporter: Transporter | undefined;

  constructor(private configurationProvider: ConfigurationProvider, private users: UserService) {
    this.configurationProvider.register(this);
    this.setTransporter();
  }
  public async sendMailToUser(mailOptions: MailOptions): Promise<void> {
    if (!this.transporter) {
      return;
    }
    const users = await this.users.getUsers();
    const user = users.find((u) => u.id === mailOptions.to);
    console.log('Send Mail to user', mailOptions, user);

    await this.sendMail({ ...mailOptions, to: user.email });
  }

  public async sendMail(mailOptions: MailOptions): Promise<void> {
    if (!this.transporter) {
      return;
    }
    //await this.transporter.sendMail({ ...mailOptions, from: 'noreply@iot-manager.local' });
    Logger.instance.info('Mails are disabled, logging them instead');
    Logger.instance.info(JSON.stringify(mailOptions));
  }

  public onUpdate(): void {
    Logger.instance.info('Mail settings changed');
    this.setTransporter();
  }

  private async setTransporter(): Promise<void> {
    Logger.instance.info('Setting mail transporter');
    const settings = await this.configurationProvider.getSettings();
    this.transporter = undefined;

    if (!settings.mailSettings) {
      return;
    }

    const { gmail, password } = settings.mailSettings;

    if (!gmail || !password) {
      return;
    }

    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: gmail,
        pass: password,
      },
    });
  }
}
