import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';

import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('api')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/users')
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
