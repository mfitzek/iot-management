import { Observer } from '@iot/utility';
import { Injectable } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';
import { ConfiguratioProvider } from '../settings/settings-provider.service';
import { MailOptions, MailService } from '@iot/mailing';

@Injectable()
export class GmailMailService implements Observer, MailService {
  private transporter: Transporter | undefined;

  constructor(private configurationProvider: ConfiguratioProvider) {
    this.setTransporter();
  }
  public async sendMail(mailOptions: MailOptions): Promise<void> {
    if (!this.transporter) {
      return;
    }
    this.transporter.sendMail(mailOptions);
  }

  public onUpdate(): void {
    this.setTransporter();
  }

  private async setTransporter(): Promise<void> {
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
