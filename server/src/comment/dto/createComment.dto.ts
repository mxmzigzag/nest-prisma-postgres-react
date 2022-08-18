export class CreateCommentDto {
  readonly message: string;
  readonly userId: string;
  readonly postId: string;
  readonly parentId?: string;
}
