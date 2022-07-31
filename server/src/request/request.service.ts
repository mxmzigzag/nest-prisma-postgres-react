import { Injectable } from '@nestjs/common';
import { RequestTypes } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRequestDto } from './dto/createRequest.dto';

@Injectable()
export class RequestService {
  constructor(private readonly prismaService: PrismaService) {}

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

  async getRequestIsSentByUser(userId: number, type: RequestTypes) {
    const req = await this.prismaService.request.findFirst({
      where: {
        type,
        userId,
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
}
