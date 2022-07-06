import { Injectable } from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPost(dto: CreatePostDto) {
    return this.prismaService.post.create({
      data: dto,
    });
  }

  async getPosts(): Promise<PostModel[]> {
    return this.prismaService.post.findMany();
  }

  async getOnePost(id: number): Promise<PostModel> {
    return this.prismaService.post.findUnique({ where: { id } });
  }

  async updatePost(id: number, postDto: UpdatePostDto) {
    return this.prismaService.post.update({ where: { id }, data: postDto });
  }

  async deletePost(id: number) {
    return this.prismaService.post.delete({ where: { id } });
  }
}
