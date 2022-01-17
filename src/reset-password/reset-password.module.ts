import { EmailTemplateModule } from '@/email-template/email-template.module';
import { MailerModule } from '@/mailer/mailer.module';
import { UserEmailModule } from '@/user-email/user-email.module';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordController } from './reset-password.controller';

@Module({
  providers: [ResetPasswordService],
  controllers: [ResetPasswordController],
  imports: [EmailTemplateModule, UserModule, UserEmailModule, MailerModule],
})
export class ResetPasswordModule {}
