import { Body, Controller, Post } from '@nestjs/common';
import { SendLetterDto } from './dto/sendLetter.dto';
import { MailService } from './mail.service';

@Controller('api')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('send/letter')
  sendLetter(@Body() dto: SendLetterDto) {
    return this.mailService.sendLetter(dto);
  }
}
