import { Injectable } from '@nestjs/common';
import { Comment } from '@prisma/client';

import { CreateCommentDto } from './dto/createComment.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async createComment(dto: CreateCommentDto): Promise<Comment> {
    return this.prismaService.comment.create({
      data: dto,
    });
  }

  async getAllComments(): Promise<Comment[]> {
    return this.prismaService.comment.findMany({
      include: { parent: true, children: true },
    });
  }

  async getCommentsOfPost(postId: string): Promise<Comment[]> {
    return this.prismaService.comment.findMany({
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
      },
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
      },
    });
  }
}
