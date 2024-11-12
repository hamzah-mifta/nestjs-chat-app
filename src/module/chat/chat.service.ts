import { Injectable } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { HttpResponse, SuccessResponse } from 'src/common/utils/response.util';
import { Logger } from 'src/common/utils/logger.utils';
import { captureError } from 'src/common/utils/sentry.utils';
import { ReqSendBroadcastMessageDto } from './dto/request/send-broadcast-message.dto';
import {
  BadRequestError,
  InternalServerError,
} from 'src/common/utils/error.utils';
import { ReqSendPrivateMessageDto } from './dto/request/send-private-message.dto';
import { UserRepository } from '../user/repository/user.repository';

@Injectable()
export class ChatService {
  private logger = new Logger();

  constructor(
    private readonly userRepository: UserRepository,
    private readonly chatGateway: ChatGateway,
  ) {}

  async sendBroadcastMessage(
    user: any,
    payload: ReqSendBroadcastMessageDto,
  ): Promise<HttpResponse> {
    try {
      this.chatGateway.sendBroadcastMessage({
        sender: user.username,
        message: payload.message,
      });

      return new SuccessResponse(null, 'Message sent');
    } catch (error) {
      this.logger.error(error.message, error);

      captureError(error, 'ChatService:sendBroadcastMessage', payload);

      return new InternalServerError('Failed to send message');
    }
  }

  async sendPrivateMessage(
    user: any,
    payload: ReqSendPrivateMessageDto,
  ): Promise<HttpResponse> {
    try {
      const recipient = await this.userRepository.findById(payload.recipientId);
      if (!recipient) {
        return new BadRequestError('Recipient not found');
      }

      this.chatGateway.sendPrivateMessage({
        sender: user.username,
        recipientId: recipient._id.toString(),
        message: payload.message,
      });

      return new SuccessResponse(null, 'Message sent');
    } catch (error) {
      this.logger.error(error.message, error);

      captureError(error, 'ChatService:sendBroadcastMessage', payload);

      return new InternalServerError('Failed to send message');
    }
  }
}
