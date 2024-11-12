import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ReqSendBroadcastMessageDto } from './dto/request/send-broadcast-message.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ReqSendPrivateMessageDto } from './dto/request/send-private-message.dto';

@Controller('/v1/chat')
export class ChatController {
  constructor(
    private readonly chatGateway: ChatGateway,
    private readonly chatService: ChatService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/broadcast-message')
  async sendBroadcastMessage(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: ReqSendBroadcastMessageDto,
  ) {
    const user = req['user'];

    const result = await this.chatService.sendBroadcastMessage(user, body);
    return res.status(result.statusCode).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/private-message')
  async sendPrivateMessage(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: ReqSendPrivateMessageDto,
  ) {
    const user = req['user'];

    const result = await this.chatService.sendPrivateMessage(user, body);
    return res.status(result.statusCode).json(result);
  }
}
