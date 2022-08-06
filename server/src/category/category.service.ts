import { Injectable } from '@nestjs/common';
import { Category as CategoryModel } from '@prisma/client';

import { CategoryDto } from './dto/category.dto';
import { CategoryQueryDto } from './dto/categoryQuery.dto';
import { CategoryPaginationDto } from './dto/categoryPagination.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCategory(dto: CategoryDto) {
    return this.prismaService.category.create({
      data: dto,
    });
  }

  async getAllCategories({
    offset,
    limit,
  }: CategoryQueryDto): Promise<CategoryPaginationDto> {
    const totalCount = await this.prismaService.category.count();
    const totalPages = limit ? Math.ceil(totalCount / limit) : 1;
    const page = await this.prismaService.category.findMany({
      skip: offset || 0,
      take: limit || totalCount,
    });
    return { totalCount, totalPages, page };
  }

  async getOneCategory(id: string): Promise<CategoryModel> {
    return this.prismaService.category.findUnique({ where: { id } });
  }

  async updateCategory(id: string, postDto: CategoryDto) {
    return this.prismaService.category.update({
      where: { id },
      data: postDto,
    });
  }

  async deleteCategory(id: string) {
    return this.prismaService.category.delete({
      where: { id },
    });
  }
}
