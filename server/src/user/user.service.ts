import { Injectable } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import 'dotenv/config';
import { FilesService } from 'src/files/files.service';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly filesService: FilesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    return this.prismaService.user.create({
      data: dto,
    });
  }

  async getUsers(): Promise<UserModel[]> {
    return this.prismaService.user.findMany({ include: { banned: true } });
  }

  async getUserById(id: string): Promise<UserModel> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getUserByEmail(email: string): Promise<UserModel> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
      include: {
        banned: true,
      },
    });
  }

  async updateUser(id: string, dto: Partial<UpdateUserDto>, avatar?: any) {
    if (avatar) {
      const fileName = await this.filesService.createFile(avatar);
      return this.prismaService.user.update({
        where: { id },
        data: { ...dto, avatar: fileName },
      });
    } else {
      return this.prismaService.user.update({
        where: { id },
        data: { ...dto },
      });
    }
  }

  async deleteUser(id: string) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
