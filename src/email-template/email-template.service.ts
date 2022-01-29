import { loadTemplate } from '@/common/load-template';
import { EmailTemplateNameEnum } from '@/email-template/email-template-name.enum';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { EmailTemplate } from '@prisma/client';
import handlebars from 'handlebars';

@Injectable()
export class EmailTemplateService {
  private logger = new Logger(EmailTemplateService.name);

  constructor(private readonly prismaService: PrismaService) {}
  async loadByTemplateName({
    templateName,
  }: {
    templateName: EmailTemplateNameEnum;
  }): Promise<EmailTemplate> {
    return await this.prismaService.emailTemplate.findUnique({
      where: {
        templateName,
      },
    });
  }

  async loadAndTranspileByTemplateName({
    templateName,
    contextEmail,
  }: {
    templateName: EmailTemplateNameEnum;
    contextEmail: any;
  }): Promise<{ html: string; emailTemplate: EmailTemplate }> {
    const emailTemplate = await this.loadByTemplateName({
      templateName,
    });

    const template = handlebars.compile(
      await loadTemplate({
        fileTemplateName: emailTemplate.fileTemplateName,
      }),
    );
    this.logger.log('Template gerado');

    const html = template(contextEmail);

    return {
      html,
      emailTemplate,
    };
  }
}
