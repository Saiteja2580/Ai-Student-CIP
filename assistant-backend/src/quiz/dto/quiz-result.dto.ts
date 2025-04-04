import { IsString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { QuizQuestion } from './question-dto';

export class QuizResultDto {
  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsNumber()
  totalQuestions: number;

  @IsNumber()
  correctAnswers: number;

  @IsNumber()
  percentage: number;
}
