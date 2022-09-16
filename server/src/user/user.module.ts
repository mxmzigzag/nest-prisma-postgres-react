import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController],
  imports: [
    forwardRef(() => AuthModule),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || 'SOME SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    FilesModule,
  ],
  exports: [UserService],
})
export class UserModule {}
