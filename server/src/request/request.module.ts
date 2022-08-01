import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';

@Module({
  providers: [RequestService, PrismaService],
  controllers: [RequestController],
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || 'SOME SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
})
export class RequestModule {}
