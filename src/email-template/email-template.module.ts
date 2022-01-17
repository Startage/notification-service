import { PrismaService } from '@/prisma.service';
import { Module } from '@nestjs/common';
import { EmailTemplateService } from './email-template.service';

@Module({
  providers: [PrismaService, EmailTemplateService],
  exports: [EmailTemplateService],
})
export class EmailTemplateModule {}
