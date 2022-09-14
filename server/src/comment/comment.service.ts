import { Injectable } from '@nestjs/common';
import { Comment, Like } from '@prisma/client';

import { CreateCommentDto } from './dto/createComment.dto';
import { GetAllCommentsDto } from './dto/getAllComments.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async createComment(dto: CreateCommentDto): Promise<Comment> {
    return this.prismaService.comment.create({
      data: dto,
    });
  }

  async getAllComments(): Promise<GetAllCommentsDto> {
    const totalCount = await this.prismaService.comment.count();
    const comments = await this.prismaService.comment.findMany({
      include: { parent: true, children: true, like: true },
    });
    return { comments, totalCount };
  }

  async getCommentsOfPost(postId: string): Promise<GetAllCommentsDto> {
    const totalCount = await this.prismaService.comment.count({
      where: {
        postId,
      },
    });
    const comments = await this.prismaService.comment.findMany({
      where: {
        postId,
        parentId: null,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        like: true,
      },
    });
    return { comments, totalCount };
  }

  async addReplyToComment(commentDto: CreateCommentDto) {
    return this.prismaService.comment.create({
      data: commentDto,
    });
  }

  async getCommentReplies(commentId: string): Promise<Comment[]> {
    return this.prismaService.comment.findMany({
      where: {
        parentId: commentId,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        like: true,
      },
    });
  }

  async likeComment(userId: string, commentId: string): Promise<Like> {
    return this.prismaService.like.create({
      data: {
        userId,
        commentId,
      },
    });
  }

  async unlikeComment(userId: string, commentId: string): Promise<Like> {
    return this.prismaService.like.delete({
      where: {
        userId_commentId: {
          userId,
          commentId,
        },
      },
    });
  }

  async deleteComment(commentId: string): Promise<Comment> {
    return this.prismaService.comment.delete({
      where: {
        id: commentId,
      },
    });
  }
}
