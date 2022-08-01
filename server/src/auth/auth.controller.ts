import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { AuthService } from './auth.service';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registration')
  @UsePipes(ValidationPipe)
  async registration(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userData = await this.authService.registration(userDto);
    res.cookie('token', userData.token, {
      expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
      sameSite: 'strict',
      httpOnly: true,
    });
    res.set({ 'Access-Control-Allow-Credentials': true });
    return res.send(userData);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() userDto: LoginUserDto, @Res() res: Response) {
    const userData = await this.authService.login(userDto);
    res.cookie('token', userData.token, {
      expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
      sameSite: 'strict',
      httpOnly: true,
    });
    res.set({ 'Access-Control-Allow-Credentials': true });
    return res.send(userData);
  }

  @Post('/logout')
  async logout(@Res() res: Response) {
    res.clearCookie('token');
    res.set({ 'Access-Control-Allow-Credentials': true });
    return res.send({ message: 'Logged out' });
  }
}
