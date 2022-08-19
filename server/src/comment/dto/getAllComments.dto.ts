import { Comment } from '@prisma/client';

export class GetAllCommentsDto {
  readonly comments: Comment[];
  readonly totalCount: number;
}
