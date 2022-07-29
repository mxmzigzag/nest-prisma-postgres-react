import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { User as UserModel } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registration(dto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        'The user with this email is already registered',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 3);

    const user = await this.userService.createUser({
      ...dto,
      password: hashedPassword,
    });
    const { token } = await this.generateToken(user);

    return { user, token };
  }

  async login(dto: LoginUserDto) {
    const user = await this.validateUser(dto);
    const { token } = await this.generateToken(user);

    return { user, token };
  }

  // async logout(email: string) {
  //   return this.prismaService.user.update({
  //     where: { email },
  //     data: { token: '' },
  //   });
  // }

  private async generateToken(user: UserModel) {
    const payload = { email: user.email, id: user.id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);

    if (!user)
      throw new UnauthorizedException({ message: 'Wrong email or password!' });

    const isPassEquals = await bcrypt.compare(userDto.password, user.password);

    if (user && isPassEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Wrong email or password!' });
  }
}
