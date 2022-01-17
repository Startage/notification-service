import { loadTemplate } from '@/common/load-template';
import { EmailTemplateNameEnum } from '@/email-template/email-template-name.enum';
import { EmailTemplateService } from '@/email-template/email-template.service';
import { MailerService } from '@/mailer/mailer.service';
import { UserEmailService } from '@/user-email/user-email.service';
import { UserService } from '@/user/user.service';
import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import handlebars from 'handlebars';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly emailTemplateService: EmailTemplateService,
    private readonly userEmailService: UserEmailService,
    private readonly mailerService: MailerService,
  ) {}

  async signup({
    name,
    email,
    phone,
    userReference,
    confirmToken,
    baseUrlConfirmation,
  }: {
    name: string;
    email: string;
    phone: string;
    userReference: string;
    confirmToken: string;
    baseUrlConfirmation: string;
  }) {
    const user = await this.userService.upsertById({
      name,
      email,
      phone,
      id: userReference,
    });

    await this.handleSendEmailSignup({
      user,
      confirmToken,
      baseUrlConfirmation,
    });
  }

  async resendSignupConfirmEmail({
    confirmToken,
    baseUrlConfirmation,
    email,
  }: {
    confirmToken: string;
    baseUrlConfirmation: string;
    email: string;
  }) {
    const user = await this.userService.loadByEmail({
      email,
    });
    await this.handleSendEmailSignup({
      user,
      confirmToken,
      baseUrlConfirmation,
    });
  }

  private async handleSendEmailSignup({
    user,
    confirmToken,
    baseUrlConfirmation,
  }: {
    user: User;
    baseUrlConfirmation: string;
    confirmToken: string;
  }) {
    const { html, emailTemplate } =
      await this.emailTemplateService.loadAndTranspileByTemplateName({
        templateName: EmailTemplateNameEnum.authSignup,
        contextEmail: {
          name: user.name,
          baseUrlConfirmation,
          confirmToken,
        },
      });

    this.logger.log('Template gerado');

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
