import { IsString, IsNotEmpty, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFileDto {
  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  filetype: string;

  @IsString()
  @IsOptional()
  extractedText?: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  createdAt: Date = new Date(); // Default to current date and time
}
