import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { CreateRequestDto } from './dto/createRequest.dto';

import { RequestService } from './request.service';

@Controller('api')
export class RequestController {
  constructor(private requestService: RequestService) {}

  @Post('/request')
  createRequest(@Body() dto: CreateRequestDto) {
    return this.requestService.createRequest(dto);
  }

  @Get('/requests')
  getAllRequests() {
    return this.requestService.getAllRequests();
  }

  @Get('/requestIsSent')
  getRequestIsSentByUser(@Query() { userId, type }: CreateRequestDto) {
    return this.requestService.getRequestIsSentByUser(Number(userId), type);
  }

  @Delete('/request/:reqId')
  deleteRequest(@Param('reqId') reqId: string) {
    return this.requestService.deleteRequest(reqId);
  }

  @Post('/request/:reqId/accept')
  acceptRequest(@Param('reqId') reqId: string) {
    return this.requestService.acceptRequest(reqId);
  }

  @Post('/request/:reqId/reject')
  rejectRequest(@Param('reqId') reqId: string) {
    return this.requestService.rejectRequest(reqId);
  }
}
