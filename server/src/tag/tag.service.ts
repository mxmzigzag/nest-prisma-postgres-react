import { Injectable } from '@nestjs/common';
import { Tag as TagModel } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto } from './dto/CreateTag.dto';
import { UpdateTagDto } from './dto/UpdateTag.dto';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTag(dto: CreateTagDto) {
    return this.prismaService.tag.create({
      data: dto,
    });
  }

  async getTags(): Promise<TagModel[]> {
    return this.prismaService.tag.findMany();
  }

  async updateTag(id: string, tagDto: UpdateTagDto) {
    return this.prismaService.tag.update({ where: { id }, data: tagDto });
  }

  async deleteTag(id: string) {
    return this.prismaService.tag.delete({ where: { id } });
  }
}
