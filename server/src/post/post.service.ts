import { Injectable } from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';
import { FilesService } from 'src/files/files.service';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/createPost.dto';
import { PostsPaginationDto } from './dto/PostsPagination.dto';
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
        authorId: authorId,
        categoryId: categoryId,
        tags: {
          create: JSON.parse(tags).map((tagId) => ({
            assignedAt: new Date(),
            tag: {
              connect: { id: tagId },
            },
          })),
        },
      },
    });
  }

  async getPosts({ limit }: { limit: number }): Promise<PostsPaginationDto> {
    const totalCount = await this.prismaService.post.count();
    const posts = await this.prismaService.post.findMany({
      take: limit,
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
    return { totalCount, posts };
  }

  async getTopViewedPosts() {
    return this.prismaService.post.groupBy({
      by: ['categoryId'],
      _max: {
        id: true,
        title: true,
        description: true,
        image: true,
        viewsCount: true,
      },
    });
  }

  async getPostsByAuthorId({
    authorId,
    limit,
  }: {
    authorId: string;
    limit: number;
  }): Promise<PostsPaginationDto> {
    const totalCount = await this.prismaService.post.count({
      where: {
        authorId,
      },
    });
    const posts = await this.prismaService.post.findMany({
      take: limit,
      where: {
        authorId,
      },
      include: {
        author: { select: { id: true, username: true } },
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
    return { totalCount, posts };
  }

  async getOnePost(id: string): Promise<PostModel> {
    return this.prismaService.post.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, username: true } },
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  async updatePost(id: string, postDto: UpdatePostDto) {
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

  async updatePostViewsCount(id: string) {
    return this.prismaService.post.update({
      where: { id },
      data: {
        viewsCount: {
          increment: 1,
        },
      },
    });
  }

  async deletePost(id: string) {
    return this.prismaService.post.delete({ where: { id } });
  }
}
