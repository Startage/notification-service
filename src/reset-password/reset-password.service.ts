import { EmailTemplateNameEnum } from '@/email-template/email-template-name.enum';
import { EmailTemplateService } from '@/email-template/email-template.service';
import { MailerService } from '@/mailer/mailer.service';
import { UserEmailService } from '@/user-email/user-email.service';
import { UserService } from '@/user/user.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ResetPasswordService {
  private logger = new Logger(ResetPasswordService.name);

  constructor(
    private readonly userService: UserService,
    private readonly emailTemplateService: EmailTemplateService,
    private readonly userEmailService: UserEmailService,
    private readonly mailerService: MailerService,
  ) {}

  async requestResetPassword({
    resetPasswordToken,
    baseUrlResetPassword,
    email,
  }: {
    resetPasswordToken: string;
    baseUrlResetPassword: string;
    email: string;
  }) {
    console.log(email);
    const user = await this.userService.loadByEmail({
      email,
    });

    if (user) {
      const { html, emailTemplate } =
        await this.emailTemplateService.loadAndTranspileByTemplateName({
          templateName: EmailTemplateNameEnum.authResetPassword,
          contextEmail: {
            name: user.name,
            baseUrlResetPassword,
            resetPasswordToken,
          },
        });

      await this.mailerService.send({
        from: emailTemplate.fromEmail,
        to: user.email,
        subject: emailTemplate.subjectEmail,
        bcc: emailTemplate.bccEmail,
        html,
      });

      try {
        await this.userEmailService.create({
          userId: user.id,
          emailTemplateId: emailTemplate.id,
          bccEmail: emailTemplate.bccEmail,
          fromEmail: emailTemplate.fromEmail,
          toEmail: user.email,
          subjectEmail: emailTemplate.subjectEmail,
          html,
        });
      } catch (err) {
        this.logger.error('Falha ao criar o registro do email', err);
      }
    }
  }
}
