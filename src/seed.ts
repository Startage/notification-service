import { EmailTemplateNameEnum } from './email-template/email-template-name.enum';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

const prisma = new PrismaClient();

async function main() {
  dotenv.config();
  console.log('Seeding...');
  /// --------- EmailTemplates ---------------
  const authSignupExists = await prisma.emailTemplate.findUnique({
    where: { templateName: EmailTemplateNameEnum.authSignup },
  });
  if (!authSignupExists) {
    await prisma.emailTemplate.create({
      data: {
        templateName: EmailTemplateNameEnum.authSignup,
        fileTemplateName: 'auth-signup.hbs',
        fromEmail: process.env.DEFAULT_SMTP_FROM,
        subjectEmail: 'Confirmação de cadastro',
      },
    });
  }
  const authResetPasswordExists = await prisma.emailTemplate.findUnique({
    where: { templateName: EmailTemplateNameEnum.authResetPassword },
  });
  if (!authResetPasswordExists) {
    await prisma.emailTemplate.create({
      data: {
        templateName: EmailTemplateNameEnum.authResetPassword,
        fileTemplateName: 'auth-reset-password.hbs',
        fromEmail: process.env.DEFAULT_SMTP_FROM,
        subjectEmail: 'Alteração de Senha',
      },
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
