import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { EmailTemplateService } from './email-template.service';

@Module({
  imports: [PrismaModule],
  providers: [EmailTemplateService],
  exports: [EmailTemplateService],
})
export class EmailTemplateModule {}
