import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('api')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/user')
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Get('/users')
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/user/:id')
  getUser(@Param('id') id: number) {
    return this.userService.getOneUser(+id);
  }

  @Put('/user/:id')
  updateUser(@Param('id') id: number, @Body() userDto: UpdateUserDto) {
    return this.userService.updateUser(Number(id), userDto);
  }

  @Delete('/user/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(Number(id));
  }

  @Get('/user/:id/posts')
  getUserPosts(@Param('id') authorId: number) {
    return this.userService.getUserPosts(Number(authorId));
  }
}
