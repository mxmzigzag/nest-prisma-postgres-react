import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PrismaService, PostService],
  controllers: [PostController],
})
export class PostModule {}
