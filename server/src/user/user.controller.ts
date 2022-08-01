import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateUserDto } from './dto/createUser.dto';

import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('api')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/user')
  @UsePipes(ValidationPipe)
  createUser(dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Get('/users')
  @UseGuards(JwtAuthGuard)
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/user/:id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(+id);
  }

  @Get('/user')
  getUserByEmail(@Body() email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Put('/user/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  updateUser(@Param('id') id: number, @Body() userDto: Partial<UpdateUserDto>) {
    return this.userService.updateUser(Number(id), userDto);
  }

  @Delete('/user/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(Number(id));
  }

  @Get('/user/:id/posts')
  @UseGuards(JwtAuthGuard)
  getUserPosts(@Param('id') authorId: number) {
    return this.userService.getUserPosts(Number(authorId));
  }
}
