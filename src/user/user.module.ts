import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
