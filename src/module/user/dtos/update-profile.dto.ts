import { IsArray, IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  displayName?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsDate()
  @IsOptional()
  birthday?: Date;

  @IsArray()
  @IsOptional()
  interests?: string[];
}
