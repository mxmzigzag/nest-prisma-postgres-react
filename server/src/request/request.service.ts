import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RequestStatus, RequestTypes, Role } from '@prisma/client';

import { CreateRequestDto } from './dto/createRequest.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { BannedUserService } from 'src/banned-user/banned-user.service';

@Injectable()
export class RequestService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly bannedUserService: BannedUserService,
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
        status: RequestStatus.PENDING,
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

    if (request.type === RequestTypes.UPDATE_TO_CREATOR) {
      await this.userService.updateUser(request.userId, {
        role: Role.CREATOR,
      });
    } else if (request.type === RequestTypes.UPDATE_TO_ADMIN) {
      await this.userService.updateUser(request.userId, {
        role: Role.ADMIN,
      });
    } else if (request.type === RequestTypes.UNBAN) {
      await this.bannedUserService.unbanUser(request.userId);
    } else {
      throw new HttpException(
        'There is no request with such type',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prismaService.request.update({
      where: {
        id: reqId,
      },
      data: {
        status: RequestStatus.ACCEPTED,
        updatedAt: new Date(),
      },
    });
  }

  async rejectRequest(reqId: string) {
    return this.prismaService.request.update({
      where: {
        id: reqId,
      },
      data: {
        status: RequestStatus.REJECTED,
        updatedAt: new Date(),
      },
    });
  }
}
