import { Module } from '@nestjs/common';
import { MailgunModule } from 'nestjs-mailgun';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';

@Module({
  imports: [
    MailgunModule.forAsyncRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        username: 'api',
        key: configService.get('MAILGUN_SECRET'),
        url: configService.get('MAILGUN_ENDPOINT')?.includes('https') ?
          configService.get('MAILGUN_ENDPOINT') :
          `https://${configService.get('MAILGUN_ENDPOINT')}`,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService]
})

export class EmailModule {}
