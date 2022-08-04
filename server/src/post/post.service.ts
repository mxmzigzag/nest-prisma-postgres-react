import { Injectable } from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';
import { FilesService } from 'src/files/files.service';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly filesService: FilesService,
  ) {}

  async createPost(dto: CreatePostDto, image: any) {
    const { title, description, body, authorId, categoryId, tags } = dto;
    const fileName = await this.filesService.createFile(image);
    return this.prismaService.post.create({
      data: {
        title,
        description,
        body,
        image: fileName,
        authorId: Number(authorId),
        categoryId: Number(categoryId),
        tags: {
          create: tags?.map((tag) => ({
            assignedAt: new Date(),
            tag: {
              create: tag,
            },
          })),
        },
      },
    });
  }

  async getPosts(): Promise<PostModel[]> {
    return this.prismaService.post.findMany({
      include: {
        author: {
          select: {
            username: true,
          },
        },
        category: true,
        tags: {
          select: {
            tag: {
              select: { name: true },
            },
          },
        },
      },
    });
  }

  async getTopViewedPosts() {
    //@ts-ignore
    return this.prismaService.post.groupBy({
      by: ['title', 'categoryId'],
    });
  }

  async getPostsByAuthorId(authorId: number): Promise<PostModel[]> {
    return this.prismaService.post.findMany({
      where: {
        authorId,
      },
      include: {
        author: { select: { id: true, username: true } },
      },
    });
  }

  async getOnePost(id: number): Promise<PostModel> {
    return this.prismaService.post.findUnique({ where: { id } });
  }

  async updatePost(id: number, postDto: UpdatePostDto) {
    const { title, description, body, categoryId, tags } = postDto;
    return this.prismaService.post.update({
      where: { id },
      data: {
        title,
        description,
        body,
        categoryId,
        tags: {
          create: tags.map((tag) => ({
            assignedAt: new Date(),
            tag: {
              create: tag,
            },
          })),
        },
      },
    });
  }

  async deletePost(id: number) {
    return this.prismaService.post.delete({ where: { id } });
  }
}
