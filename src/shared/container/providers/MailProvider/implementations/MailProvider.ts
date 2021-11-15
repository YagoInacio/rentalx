import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import { IMailVariablesDTO } from '../dtos/IMailVariablesDTO';
import { IMailProvider } from '../IMailProvider';

@injectable()
class MailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    this.client = transporter;
    console.log('🚀 [MAIL] Transporter created!');
  }

  async sendMail(
    to: string,
    subject: string,
    variables: IMailVariablesDTO,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: `Yago <${process.env.SMTP_USER}>`,
      subject,
      html: templateHTML,
    });

    console.log('Message sent: %s', message.messageId);
  }
}

export { MailProvider };
