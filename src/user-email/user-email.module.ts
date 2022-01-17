import { PrismaService } from '@/prisma.service';
import { Module } from '@nestjs/common';
import { UserEmailService } from './user-email.service';

@Module({
  providers: [PrismaService, UserEmailService],
  exports: [UserEmailService],
})
export class UserEmailModule {}
