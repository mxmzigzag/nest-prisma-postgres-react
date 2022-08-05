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
  getOneCategory(@Param('id') id: string) {
    return this.categoryService.getOneCategory(id);
  }

  @Put('/category/:id')
  updateCategory(@Param('id') id: string, @Body() postDto: CategoryDto) {
    return this.categoryService.updateCategory(id, postDto);
  }

  @Delete('/category/:id')
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
