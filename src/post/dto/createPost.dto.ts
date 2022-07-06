export class CreatePostDto {
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly categoryId: number[];
  readonly authorId: number;
}
