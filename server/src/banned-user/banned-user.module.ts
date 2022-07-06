import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BannedUserController } from './banned-user.controller';
import { BannedUserService } from './banned-user.service';

@Module({
  controllers: [BannedUserController],
  providers: [PrismaService, BannedUserService],
})
export class BannedUserModule {}
