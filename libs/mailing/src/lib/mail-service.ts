export interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export interface MailService {
  sendMail(mailOptions: MailOptions): Promise<void>;
}
