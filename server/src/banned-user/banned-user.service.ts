import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BannedUserDto } from './dto/bannedUser.dto';

@Injectable()
export class BannedUserService {
  constructor(private readonly prismaService: PrismaService) {}

  async banUser(userId: string) {
    return this.prismaService.bannedUser.create({
      data: {
        userId,
      },
    });
  }

  async getAllBannedUsers(): Promise<BannedUserDto[]> {
    return this.prismaService.bannedUser.findMany();
  }

  async unbanUser(userId: string) {
    return this.prismaService.bannedUser.delete({
      where: { userId },
    });
  }
}
