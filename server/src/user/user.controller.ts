import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('api')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  async registerUser(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userData = await this.userService.registerUser(userDto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 100,
      httpOnly: true,
    });
    return userData;
  }

  @Post('/login')
  async loginUser(
    @Body() userDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userData = await this.userService.loginUser(userDto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 100,
      httpOnly: true,
    });
    return userData;
  }

  @Post('/logout')
  async logoutUser(@Req() req: Request, @Res() res: Response) {
    const { refreshToken } = req.cookies;
    //@ts-ignore
    const { email } = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    res.clearCookie('refreshToken');
    return this.userService.logoutUser(email);
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
