import { IsNotEmpty, IsString } from 'class-validator';

export class ReqSendPrivateMessageDto {
  @IsString()
  @IsNotEmpty()
  recipientId: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
