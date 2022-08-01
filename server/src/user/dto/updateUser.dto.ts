import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Name needs to be a string' })
  @Length(1)
  @IsNotEmpty()
  readonly name: string;

  @IsString({ message: 'Surname needs to be a string' })
  @Length(1)
  @IsNotEmpty()
  readonly surname: string;

  @IsString({ message: 'Username needs to be a string' })
  @Length(1)
  @IsNotEmpty()
  readonly username: string;

  @IsEmail({}, { message: 'Incorrect email' })
  @IsNotEmpty()
  readonly email: string;

  @IsEnum(['USER', 'CREATOR', 'ADMIN'])
  readonly role: Role;
}
