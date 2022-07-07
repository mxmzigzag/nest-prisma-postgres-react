export class UpdatePostDto {
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly categoryId: number;
  readonly tags: { name: string }[];
}
