import { IsNotEmpty, IsString } from 'class-validator';

export class PrivateMessageDto {
  @IsString()
  sender: string;

  @IsString()
  @IsNotEmpty()
  recipientId: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
