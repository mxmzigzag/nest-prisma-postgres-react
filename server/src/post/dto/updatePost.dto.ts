export class UpdatePostDto {
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly categoryId: string;
  readonly tags: { name: string }[];
}
