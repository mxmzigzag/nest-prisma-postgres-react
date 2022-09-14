import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CreateCommentDto } from './dto/createComment.dto';
import { LikeDto } from './dto/like.dto';

import { CommentService } from './comment.service';

@Controller('api')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('/comment')
  createComment(@Body() commentDto: CreateCommentDto) {
    return this.commentService.createComment(commentDto);
  }

  @Get('/comments')
  getAllComments() {
    return this.commentService.getAllComments();
  }

  @Get('/post/:postId/comments')
  getCommentsOfPost(@Param('postId') postId: string) {
    return this.commentService.getCommentsOfPost(postId);
  }

  @Post('/comment/reply')
  addReplyToComment(@Body() commentDto: CreateCommentDto) {
    return this.commentService.addReplyToComment(commentDto);
  }

  @Get('/comment/:commentId')
  getCommentReplies(@Param('commentId') commentId: string) {
    return this.commentService.getCommentReplies(commentId);
  }

  @Post('/comment/:commentId/like')
  likeComment(
    @Param('commentId') commentId: string,
    @Body() { userId }: LikeDto,
  ) {
    this.commentService.likeComment(userId, commentId);
  }

  @Post('/comment/:commentId/unlike')
  unlikeComment(
    @Param('commentId') commentId: string,
    @Body() { userId }: LikeDto,
  ) {
    this.commentService.unlikeComment(userId, commentId);
  }

  @Delete('/comment/:commentId')
  deleteComment(@Param('commentId') commentId: string) {
    return this.commentService.deleteComment(commentId);
  }
}
