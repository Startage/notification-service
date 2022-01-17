import { EmailTemplateModule } from '@/email-template/email-template.module';
import { MailerModule } from '@/mailer/mailer.module';
import { UserEmailModule } from '@/user-email/user-email.module';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [EmailTemplateModule, UserModule, UserEmailModule, MailerModule],
})
export class AuthModule {}
