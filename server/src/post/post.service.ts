import { Injectable } from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';

import { CreatePostDto } from './dto/createPost.dto';
import { GetAllPostsQueryDto } from './dto/getAllPostsQuery.dto';
import { PostsPaginationDto } from './dto/PostsPagination.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

import { FilesService } from 'src/files/files.service';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async getPosts({
    limit,
    searchQuery,
    popular,
    date,
    category,
    tags,
    isAdmin = false,
  }: GetAllPostsQueryDto): Promise<PostsPaginationDto> {
    const totalCount = await this.prismaService.post.count();
    const posts = await this.prismaService.post.findMany({
      take: limit,
      orderBy: {
        viewsCount: popular,
        createdAt: date,
      },
      where: {
        author: {
          ...(isAdmin
            ? {}
            : {
                banned: null,
              }),
        },
        title: {
          contains: searchQuery,
        },
        categoryId: category,
        tags: {
          some: {
            tagId: {
              in: tags?.split(','),
            },
          },
        },
      },
      include: {
        author: {
          select: {
            username: true,
            banned: true,
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
      where: {
        author: {
          banned: {
            is: null,
          },
        },
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
        author: { select: { id: true, username: true, banned: true } },
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

  async updatePost(id: string, postDto: UpdatePostDto, image: any) {
    const { title, description, body, categoryId, tags } = postDto;
    const data = {
      title,
      description,
      body,
      categoryId,
    };
    console.log('t', tags);

    if (image) {
      const fileName = await this.filesService.createFile(image);
      data['image'] = fileName;
    }
    return this.prismaService.post.update({
      where: { id },
      data: {
        ...data,
        // tags: {
        //   connectOrCreate: tags.map((tag) => ({
        //     where: { postId_tagId: tag },
        //     create: { assignedAt: new Date(), tagId: tag },
        //   })),
        // },
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
