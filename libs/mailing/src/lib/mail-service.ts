export interface MailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export interface MailService {
  sendMail(mailOptions: MailOptions): Promise<void>;
  sendMailToUser(mailOptions: MailOptions): Promise<void>;
}
