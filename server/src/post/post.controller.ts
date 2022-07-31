import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { PostService } from './post.service';

@Controller('api')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('/post')
  createPost(@Body() postDto: CreatePostDto) {
    return this.postService.createPost(postDto);
  }

  @Get('/posts')
  getPosts() {
    return this.postService.getPosts();
  }

  @Get('/topViewedPosts')
  getTopViewedPosts() {
    return this.postService.getTopViewedPosts();
  }

  @Get('/posts/author/:authorId')
  @UseGuards(JwtAuthGuard)
  getPostsByAuthorId(@Param('authorId') authorId: number) {
    return this.postService.getPostsByAuthorId(Number(authorId));
  }

  @Get('/post/:id')
  getOnePost(@Param('id') id: number) {
    return this.postService.getOnePost(Number(id));
  }

  @Put('/post/:id')
  updatePost(@Param('id') id: number, @Body() postDto: UpdatePostDto) {
    return this.postService.updatePost(Number(id), postDto);
  }

  @Delete('/post/:id')
  deletePost(@Param('id') id: number) {
    return this.postService.deletePost(Number(id));
  }
}
