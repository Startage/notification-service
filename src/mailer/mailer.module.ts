import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { MailerService } from './mailer.service';

@Module({
  imports: [
    SendGridModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfg: ConfigService) => ({
        apiKey: cfg.get('SENDGRID_API_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
