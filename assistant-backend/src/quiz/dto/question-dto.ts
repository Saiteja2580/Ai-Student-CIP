import { IsString, IsNotEmpty } from 'class-validator';

export class QuizQuestion {
  @IsString()
  @IsNotEmpty()
  question: string;

  options: string[];
  @IsString()
  @IsNotEmpty()
  answer: string;
}
