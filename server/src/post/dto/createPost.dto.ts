import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Title needs to be string' })
  @IsNotEmpty()
  readonly title: string;

  @IsString({ message: 'Title needs to be string' })
  readonly description: string;

  @IsString({ message: 'Title needs to be string' })
  readonly body: string;

  @IsNumber()
  readonly authorId: number;

  @IsNumber()
  readonly categoryId: number;

  readonly tags: { name: string }[];
}
