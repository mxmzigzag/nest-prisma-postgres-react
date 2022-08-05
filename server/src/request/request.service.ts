import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RequestTypes } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateRequestDto } from './dto/createRequest.dto';

@Injectable()
export class RequestService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createRequest(dto: CreateRequestDto) {
    return this.prismaService.request.create({
      data: {
        type: dto.type,
        user: {
          connect: {
            id: dto.userId,
          },
        },
      },
    });
  }

  async getAllRequests() {
    return this.prismaService.request.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            surname: true,
            username: true,
          },
        },
      },
    });
  }

  async getRequestIsSentByUser(userId: string, type: RequestTypes) {
    const req = await this.prismaService.request.findFirst({
      where: {
        type,
        userId,
        status: 'PENDING',
      },
    });

    if (req) {
      return true;
    }
    return false;
  }

  async deleteRequest(reqId: string) {
    return this.prismaService.request.delete({
      where: {
        id: reqId,
      },
    });
  }

  async acceptRequest(reqId: string) {
    const request = await this.prismaService.request.findUnique({
      where: { id: reqId },
    });

    if (!request) {
      throw new HttpException(
        'There is no such request',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (request.type === 'UPDATE_TO_CREATOR') {
      await this.userService.updateUser(request.userId, {
        role: 'CREATOR',
      });
    } else if (request.type === 'UPDATE_TO_ADMIN') {
      await this.userService.updateUser(request.userId, {
        role: 'ADMIN',
      });
    }

    return this.prismaService.request.update({
      where: {
        id: reqId,
      },
      data: {
        status: 'ACCEPTED',
      },
    });
  }

  async rejectRequest(reqId: string) {
    return this.prismaService.request.update({
      where: {
        id: reqId,
      },
      data: {
        status: 'REJECTED',
      },
    });
  }
}
