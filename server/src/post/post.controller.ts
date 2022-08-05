import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { PostService } from './post.service';

@Controller('api')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('/post')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() postDto: CreatePostDto, @UploadedFile() image: any) {
    return this.postService.createPost(postDto, image);
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
  getPostsByAuthorId(@Param('authorId') authorId: string) {
    return this.postService.getPostsByAuthorId(authorId);
  }

  @Get('/post/:id')
  getOnePost(@Param('id') id: string) {
    return this.postService.getOnePost(id);
  }

  @Put('/post/:id')
  updatePost(@Param('id') id: string, @Body() postDto: UpdatePostDto) {
    return this.postService.updatePost(id, postDto);
  }

  @Delete('/post/:id')
  @UseGuards(JwtAuthGuard)
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}
