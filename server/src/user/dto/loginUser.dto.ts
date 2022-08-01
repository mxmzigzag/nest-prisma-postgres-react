import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsString({ message: 'Email needs to be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  @IsNotEmpty()
  readonly email: string;

  @IsString({ message: 'Password needs to be a string' })
  @Length(4, 16, { message: 'Minimum 4 chars and maximum 16' })
  @IsNotEmpty()
  readonly password: string;
}
