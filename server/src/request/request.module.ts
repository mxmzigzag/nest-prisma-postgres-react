import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from 'src/prisma/prisma.service';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { UserModule } from 'src/user/user.module';
import { BannedUserModule } from 'src/banned-user/banned-user.module';

@Module({
  providers: [RequestService, PrismaService],
  controllers: [RequestController],
  imports: [
    UserModule,
    BannedUserModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || 'SOME SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
})
export class RequestModule {}
