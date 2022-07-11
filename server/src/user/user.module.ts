import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController],
  imports: [forwardRef(() => AuthModule)],
  exports: [UserService],
})
export class UserModule {}
