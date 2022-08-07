import { Post } from '@prisma/client';

export class PostsPaginationDto {
  readonly totalCount: number;
  readonly posts: Post[];
}
