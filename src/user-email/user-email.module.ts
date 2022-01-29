import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { UserEmailService } from './user-email.service';

@Module({
  imports: [PrismaModule],
  providers: [UserEmailService],
  exports: [UserEmailService],
})
export class UserEmailModule {}
