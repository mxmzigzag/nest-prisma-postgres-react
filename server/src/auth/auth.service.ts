import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { User as UserModel } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private filesService: FilesService,
    private jwtService: JwtService,
  ) {}

  async registration(dto: CreateUserDto, image: any) {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        'The user with this email is already registered',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 3);

    const fileName = await this.filesService.createFile(image);
    const user = await this.userService.createUser({
      ...dto,
      password: hashedPassword,
      avatar: fileName,
    });
    const { token } = await this.generateToken(user);

    return { user, token };
  }

  async login(dto: LoginUserDto) {
    const user = await this.validateUser(dto);
    const { token } = await this.generateToken(user);

    return { user, token };
  }

  async checkToken(curToken: string) {
    const decoded = this.jwtService.decode(curToken);

    const { token } = await this.generateToken({
      email: decoded['email'],
      id: decoded['id'],
      role: decoded['role'],
    });

    return { token };
  }

  private async generateToken(user: Partial<UserModel>) {
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
