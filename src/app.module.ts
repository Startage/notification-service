import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from './mailer/mailer.module';
import { EmailTemplateModule } from './email-template/email-template.module';
import { UserEmailModule } from './user-email/user-email.module';
import { AuthModule } from './auth/auth.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env.development', '.env'],
    }),
    MailerModule,
    UserModule,
    EmailTemplateModule,
    UserEmailModule,
    AuthModule,
    ResetPasswordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
