import { Injectable } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async registerUser(dto: CreateUserDto) {
    const { name, surname, userName, email, password } = dto;
    const candidate = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (candidate) {
      throw new Error('The user with this email is already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 3);

    const accessToken = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '1d',
    });
    const refreshToken = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });

    await this.prismaService.user.create({
      data: {
        name,
        surname,
        userName,
        email,
        token: refreshToken,
        password: hashedPassword,
      },
    });

    return { accessToken, refreshToken };
  }

  async loginUser(dto: LoginUserDto) {
    const { email, password } = dto;

    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('No such user!');
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      throw new Error('Wrong password');
    }

    const accessToken = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '1d',
    });
    const refreshToken = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });

    return { accessToken, refreshToken };
  }

  async logoutUser(email: string) {
    return this.prismaService.user.update({
      where: { email },
      data: { token: '' },
    });
  }

  async getUsers(): Promise<UserModel[]> {
    return this.prismaService.user.findMany();
  }

  async getOneUser(id: number): Promise<UserModel> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    return this.prismaService.user.update({ where: { id }, data: dto });
  }

  async deleteUser(id: number) {
    return this.prismaService.user.delete({ where: { id } });
  }

  async getUserPosts(authorId: number) {
    return this.prismaService.post.findMany({ where: { authorId } });
  }
}
