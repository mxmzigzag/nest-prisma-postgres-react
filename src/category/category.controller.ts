import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

@Controller('api')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('/category')
  createCategory(@Body() postDto: CategoryDto) {
    return this.categoryService.createCategory(postDto);
  }

  @Get('/categories')
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Get('/category/:id')
  getOneCategory(@Param('id') id: number) {
    return this.categoryService.getOneCategory(Number(id));
  }

  @Put('/category/:id')
  updateCategory(@Param('id') id: number, @Body() postDto: CategoryDto) {
    return this.categoryService.updateCategory(Number(id), postDto);
  }

  @Delete('/category/:id')
  deleteCategory(@Param('id') id: number) {
    return this.categoryService.deleteCategory(Number(id));
  }
}
