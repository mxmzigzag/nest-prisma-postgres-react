import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Title needs to be string' })
  @IsNotEmpty()
  readonly title: string;

  @IsString({ message: 'Title needs to be string' })
  readonly description: string;

  @IsString({ message: 'Title needs to be string' })
  readonly body: string;

  @IsString()
  readonly authorId: string;

  @IsString()
  readonly categoryId: string;

  readonly tags: string;
}
