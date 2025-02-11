import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { GeminiModule } from 'src/gemini/gemini.module';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from './schemas/File.schema';
import { QuizResult, QuizResultSchema } from './schemas/QuizResult.schema';

@Module({
  imports: [
    GeminiModule,
    MongooseModule.forFeature([
      { name: File.name, schema: FileSchema },
      { name: QuizResult.name, schema: QuizResultSchema },
    ]),
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
