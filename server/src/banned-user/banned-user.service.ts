import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BannedUserDto } from './dto/bannedUser.dto';

@Injectable()
export class BannedUserService {
  constructor(private readonly prismaService: PrismaService) {}

  async banUser(dto: BannedUserDto) {
    return this.prismaService.bannedUser.create({
      data: dto,
    });
  }

  async getAllBannedUsers(): Promise<BannedUserDto[]> {
    return this.prismaService.bannedUser.findMany();
  }

  async unbanUser(id: string) {
    return this.prismaService.bannedUser.delete({
      where: { id },
    });
  }
}
