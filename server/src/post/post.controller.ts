import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreatePostDto } from './dto/createPost.dto';
import { GetAllPostsQueryDto } from './dto/getAllPostsQuery.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('api')
export class PostController {
  constructor(
    private postService: PostService,
    private jwtService: JwtService,
  ) {}

  @Post('/post')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() postDto: CreatePostDto, @UploadedFile() image: any) {
    return this.postService.createPost(postDto, image);
  }

  @Get('/posts')
  async getPosts(
    @Query()
    { limit, searchQuery, popular, date, category, tags }: GetAllPostsQueryDto,
    @Req() req: Request,
  ) {
    let isAdmin = false;
    if (req?.headers?.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const user = await this.jwtService.verify(token);
      if (user.role === 'ADMIN') isAdmin = true;
    }

    return this.postService.getPosts({
      isAdmin,
      limit: Number(limit),
      searchQuery,
      popular,
      date,
      category,
      tags,
    });
  }

  @Get('/topViewedPosts')
  getTopViewedPosts() {
    return this.postService.getTopViewedPosts();
  }

  @Get('/posts/author/:authorId')
  @UseGuards(JwtAuthGuard)
  getPostsByAuthorId(
    @Param('authorId') authorId: string,
    @Query() { limit }: { limit: number },
  ) {
    return this.postService.getPostsByAuthorId({
      authorId,
      limit: Number(limit),
    });
  }

  @Get('/post/:id')
  getOnePost(@Param('id') id: string) {
    return this.postService.getOnePost(id);
  }

  @Put('/post/:id')
  updatePost(@Param('id') id: string, @Body() postDto: UpdatePostDto) {
    return this.postService.updatePost(id, postDto);
  }

  @Put('/post/:id/views')
  UpdatePostViewsCount(@Param('id') id: string) {
    return this.postService.updatePostViewsCount(id);
  }

  @Delete('/post/:id')
  @UseGuards(JwtAuthGuard)
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}
