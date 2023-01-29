import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registration')
  @UseInterceptors(FileInterceptor('image'))
  async registration(
    @Body() userDto: CreateUserDto,
    @UploadedFile() image: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userData = await this.authService.registration(userDto, image);
    return res.send(userData);
  }

  @Post('/login')
  async login(@Body() userDto: LoginUserDto, @Res() res: Response) {
    const userData = await this.authService.login(userDto);
    return res.send(userData);
  }

  @Post('/logout')
  async logout(@Res() res: Response) {
    return res.send({ message: 'Logged out' });
  }

  @Post('/check-token')
  @UseGuards(JwtAuthGuard)
  async checkTokenValidity(
    @Req() req: Request & { headers: { authorization: string } },
    @Res() res: Response,
  ) {
    const resp = await this.authService.checkToken(
      req.headers.authorization.split(' ')[1],
    );
    return res.send(resp);
  }
}
