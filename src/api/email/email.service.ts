import { Injectable } from '@nestjs/common';
import { MailgunService } from 'nestjs-mailgun';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private mailgunService: MailgunService,
    private configService: ConfigService
  ) {}

  send({ to, from, html, subject }: { to: string | string[], from?: string, html: string, subject: string }) {
    return this.mailgunService.createEmail(this.configService.get('MAILGUN_DOMAIN'), {
      from: from || 'noreply@nsystem.no',
      to: to,
      html: html,
      subject: subject,
    }).catch(e => console.log(e));
  }
}
