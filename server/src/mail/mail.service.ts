import 'dotenv/config';
import { Injectable } from '@nestjs/common';

import { SendLetterDto } from './dto/sendLetter.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendLetter({ name, email, body }: SendLetterDto) {
    return this.mailerService.sendMail({
      to: process.env.SMTP_USER,
      from: 'idp.blog@gmail.com',
      subject: `Contact letter from ${name}`,
      template: 'contact-letter',
      context: { name, email, body },
    });
  }
}
