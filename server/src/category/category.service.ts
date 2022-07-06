import { Injectable } from '@nestjs/common';
import { Category as CategoryModel } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCategory(dto: CategoryDto) {
    return this.prismaService.category.create({
      data: dto,
    });
  }

  async getAllCategories(): Promise<CategoryModel[]> {
    return this.prismaService.category.findMany();
  }

  async getOneCategory(id: number): Promise<CategoryModel> {
    return this.prismaService.category.findUnique({ where: { id } });
  }

  async updateCategory(id: number, postDto: CategoryDto) {
    return this.prismaService.category.update({
      where: { id },
      data: postDto,
    });
  }

  async deleteCategory(id: number) {
    return this.prismaService.category.delete({
      where: { id },
    });
  }
}
