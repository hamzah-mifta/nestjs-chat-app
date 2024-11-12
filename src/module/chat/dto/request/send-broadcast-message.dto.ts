import { IsNotEmpty, IsString } from 'class-validator';

export class ReqSendBroadcastMessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
