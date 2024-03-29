import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request, RequestStatus, RequestTypes, Role } from '@prisma/client';

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

  async createRequest(dto: CreateRequestDto): Promise<Request> {
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

  async getAllRequests(limit: number): Promise<Request[]> {
    return this.prismaService.request.findMany({
      orderBy: {
        createdAt: 'desc',
      },
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
      take: limit,
    });
  }

  async getNumberOfUnanswered(): Promise<number> {
    return this.prismaService.request.count({ where: { updatedAt: null } });
  }

  async getRequestIsSentByUser(
    userId: string,
    type: RequestTypes,
  ): Promise<boolean> {
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

  async deleteRequest(reqId: string): Promise<Request> {
    return this.prismaService.request.delete({
      where: {
        id: reqId,
      },
    });
  }

  async acceptRequest(reqId: string): Promise<Request> {
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

  async rejectRequest(reqId: string): Promise<Request> {
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
