export class GetAllPostsQueryDto {
  readonly limit: number;
  readonly popular?: 'asc' | 'desc';
  readonly date?: 'asc' | 'desc';
  readonly category?: string;
  readonly tags?: string;
}
