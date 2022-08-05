import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTagDto } from './dto/CreateTag.dto';
import { UpdateTagDto } from './dto/UpdateTag.dto';
import { TagService } from './tag.service';

@Controller('api')
export class TagController {
  constructor(private tagService: TagService) {}

  @Post('/tag')
  createTag(@Body() tagDto: CreateTagDto) {
    return this.tagService.createTag(tagDto);
  }

  @Get('/tags')
  getTags() {
    return this.tagService.getTags();
  }

  @Put('/tag/:id')
  updateTag(@Param('id') id: string, @Body() tagDto: UpdateTagDto) {
    return this.tagService.updateTag(id, tagDto);
  }

  @Delete('/tag/:id')
  deleteTag(@Param('id') id: string) {
    return this.tagService.deleteTag(id);
  }
}
