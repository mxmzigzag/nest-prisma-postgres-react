import { Category } from '@prisma/client';

export class CategoryPaginationDto {
  readonly totalCount: number;
  readonly totalPages: number;
  readonly page: Category[];
}
