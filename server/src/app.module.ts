import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PostModule } from './post/post.module';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { CategoryModule } from './category/category.module';
import { BannedUserModule } from './banned-user/banned-user.module';
import { CategoryController } from './category/category.controller';
import { BannedUserController } from './banned-user/banned-user.controller';
import { CategoryService } from './category/category.service';
import { BannedUserService } from './banned-user/banned-user.service';
import { TagController } from './tag/tag.controller';
import { TagService } from './tag/tag.service';
import { TagModule } from './tag/tag.module';
import { AuthModule } from './auth/auth.module';
import { RequestModule } from './request/request.module';
import { RequestController } from './request/request.controller';
import { RequestService } from './request/request.service';
import { FilesModule } from './files/files.module';

@Module({
  controllers: [
    UserController,
    PostController,
    CategoryController,
    BannedUserController,
    TagController,
    RequestController,
  ],
  providers: [
    PrismaService,
    UserService,
    PostService,
    CategoryService,
    BannedUserService,
    TagService,
    RequestService,
  ],
  imports: [
    PrismaModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    UserModule,
    PostModule,
    CategoryModule,
    BannedUserModule,
    TagModule,
    AuthModule,
    RequestModule,
    FilesModule,
  ],
})
export class AppModule {}
