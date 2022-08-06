import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CategoryDto } from './dto/category.dto';
import { CategoryQueryDto } from './dto/categoryQuery.dto';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoryService } from './category.service';

@Controller('api')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('/category')
  @UseGuards(JwtAuthGuard)
  createCategory(@Body() postDto: CategoryDto) {
    return this.categoryService.createCategory(postDto);
  }

  @Get('/categories')
  getAllCategories(@Query() { offset, limit }: CategoryQueryDto) {
    return this.categoryService.getAllCategories({
      offset: Number(offset),
      limit: Number(limit),
    });
  }

  @Get('/category/:id')
  getOneCategory(@Param('id') id: string) {
    return this.categoryService.getOneCategory(id);
  }

  @Put('/category/:id')
  @UseGuards(JwtAuthGuard)
  updateCategory(@Param('id') id: string, @Body() postDto: CategoryDto) {
    return this.categoryService.updateCategory(id, postDto);
  }

  @Delete('/category/:id')
  @UseGuards(JwtAuthGuard)
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
