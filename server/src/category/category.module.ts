import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from '../prisma/prisma.service';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  providers: [PrismaService, CategoryService],
  controllers: [CategoryController],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || 'SOME SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
})
export class CategoryModule {}
