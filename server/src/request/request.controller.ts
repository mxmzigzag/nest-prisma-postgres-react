import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { CreateRequestDto } from './dto/createRequest.dto';

import { RequestService } from './request.service';

@Controller('api')
export class RequestController {
  constructor(private requestService: RequestService) {}

  @Post('/request')
  @UseGuards(JwtAuthGuard)
  createRequest(@Body() dto: CreateRequestDto) {
    return this.requestService.createRequest(dto);
  }

  @Get('/requests')
  @UseGuards(JwtAuthGuard)
  getAllRequests() {
    return this.requestService.getAllRequests();
  }

  @Get('/requestIsSent')
  @UseGuards(JwtAuthGuard)
  getRequestIsSentByUser(@Query() { userId, type }: CreateRequestDto) {
    return this.requestService.getRequestIsSentByUser(userId, type);
  }

  @Delete('/request/:reqId')
  @UseGuards(JwtAuthGuard)
  deleteRequest(@Param('reqId') reqId: string) {
    return this.requestService.deleteRequest(reqId);
  }

  @Post('/request/:reqId/accept')
  @UseGuards(JwtAuthGuard)
  acceptRequest(@Param('reqId') reqId: string) {
    return this.requestService.acceptRequest(reqId);
  }

  @Post('/request/:reqId/reject')
  @UseGuards(JwtAuthGuard)
  rejectRequest(@Param('reqId') reqId: string) {
    return this.requestService.rejectRequest(reqId);
  }
}
