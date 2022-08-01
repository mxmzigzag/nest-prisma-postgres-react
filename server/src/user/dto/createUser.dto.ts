import { IsString, IsEmail, Length, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name needs to be a string' })
  @IsNotEmpty()
  readonly name: string;

  @IsString({ message: 'Surname needs to be a string' })
  @IsNotEmpty()
  readonly surname: string;

  @IsString({ message: 'Username needs to be a string' })
  @IsNotEmpty()
  readonly username: string;

  @IsEmail({}, { message: 'Incorrect email' })
  @IsNotEmpty()
  readonly email: string;

  @IsString({ message: 'Password needs to be a string' })
  @Length(4, 16, { message: 'Minimum 4 chars and maximum 16' })
  @IsNotEmpty()
  readonly password: string;
}
