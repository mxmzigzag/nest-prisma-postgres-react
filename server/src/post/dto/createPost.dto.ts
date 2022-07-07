export class CreatePostDto {
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly authorId: number;
  readonly categoryId: number;
  readonly tags: { name: string }[];
}
