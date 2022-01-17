import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async upsertById({
    id,
    ...data
  }: Omit<User, 'updatedAt' | 'createdAt'>): Promise<User> {
    return this.prismaService.user.upsert({
      where: {
        id,
      },
      create: data,
      update: data,
    });
  }

  async loadByEmail({ email }: { email: string }) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }
}
