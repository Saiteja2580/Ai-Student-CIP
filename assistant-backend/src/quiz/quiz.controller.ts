import {
  Body,
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { GenerateQuizDto } from './dto/generate-quiz.dto';
import { Multer } from 'multer';

import { QuizService } from './quiz.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { QuizResultDto } from './dto/quiz-result.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('quiz')
// @UseGuards(AuthGuard)
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Post('generate-quiz/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public', // Store file temporarily
        filename: (req, file, cb) => cb(null, file.originalname),
      }),
    }),
  )
  generateQuiz(@Param('id') id: string, @UploadedFile() file: Multer.File) {
    //console.log(file);
    //console.log(id);

    return this.quizService.generateQuiz(file, id);
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
