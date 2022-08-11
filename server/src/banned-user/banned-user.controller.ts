import { Controller, Get, Param, Post } from '@nestjs/common';
import { BannedUserService } from './banned-user.service';

@Controller('api')
export class BannedUserController {
  constructor(private bannedUserService: BannedUserService) {}

  @Post('/user/:userId/ban')
  banUser(@Param('userId') userId: string) {
    return this.bannedUserService.banUser(userId);
  }

  @Get('/users/banned')
  getAllBannedUsers() {
    return this.bannedUserService.getAllBannedUsers();
  }

  @Post('/user/:userId/unban')
  unbanUser(@Param('userId') userId: string) {
    return this.bannedUserService.unbanUser(userId);
  }
}
