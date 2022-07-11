import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name needs to be a string' })
  readonly name: string;

  @IsString({ message: 'Name needs to be a string' })
  readonly surname: string;

  @IsString({ message: 'Name needs to be a string' })
  readonly userName: string;

  @IsString({ message: 'Name needs to be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;

  @IsString({ message: 'Name needs to be a string' })
  @Length(4, 16, { message: 'Minimum 4 chars and maximum 16' })
  readonly password: string;
}
