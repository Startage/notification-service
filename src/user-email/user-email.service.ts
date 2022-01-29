import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserEmail } from '@prisma/client';

@Injectable()
export class UserEmailService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: Omit<UserEmail, 'id' | 'updatedAt' | 'createdAt'>,
  ): Promise<void> {
    await this.prismaService.userEmail.create({
      data,
    });
  }
}
