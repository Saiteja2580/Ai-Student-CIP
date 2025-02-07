import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GenerateQuizDto } from './dto/generate-quiz.dto';
import { QuizService } from './quiz.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { QuizResultDto } from './dto/quiz-result.dto';

@Controller('quiz')
@UseGuards(AuthGuard)
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Post('generate-quiz')
  generateQuiz(@Body(ValidationPipe) topic: GenerateQuizDto) {
    return this.quizService.generateQuiz(topic);
  }

  @Post('submit-quiz/:id')
  submitQuiz(
    @Param('id') id: string, // Access the route parameter
    @Body(ValidationPipe) quizResult: QuizResultDto,
  ) {
    //console.log('ID : ', id, 'Reslut : ', quizResult);

    return this.quizService.submitQuiz(id, quizResult);
  }
}
