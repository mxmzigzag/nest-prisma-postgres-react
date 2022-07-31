import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [PrismaService, PostService],
  controllers: [PostController],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || 'SOME SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
})
export class PostModule {}
