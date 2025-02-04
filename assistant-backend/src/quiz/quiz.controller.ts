import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GenerateQuizDto } from './dto/generate-quiz.dto';
import { QuizService } from './quiz.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('quiz')
@UseGuards(AuthGuard)
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Post('generate-quiz')
  generateQuiz(@Body(ValidationPipe) topic: GenerateQuizDto) {
    return this.quizService.generateQuiz(topic);
  }
}
