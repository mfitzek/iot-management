import { Observer } from '@iot/utility';
import { Injectable } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';
import { ConfiguratioProvider } from '../settings/settings-provider.service';
import { MailOptions, MailService } from '@iot/mailing';
import { Logger } from '@iot/logger';

@Injectable()
export class GmailMailService implements Observer, MailService {
  private transporter: Transporter | undefined;

  constructor(private configurationProvider: ConfiguratioProvider) {
    this.configurationProvider.register(this);
    this.setTransporter();
  }
  public async sendMail(mailOptions: MailOptions): Promise<void> {
    if (!this.transporter) {
      return;
    }
    await this.transporter.sendMail(mailOptions);
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
