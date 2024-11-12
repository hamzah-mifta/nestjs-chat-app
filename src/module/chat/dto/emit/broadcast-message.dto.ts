import { IsNotEmpty, IsString } from 'class-validator';

export class BroadcastMessageDto {
  @IsString()
  sender: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
