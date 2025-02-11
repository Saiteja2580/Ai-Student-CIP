import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';

import { ConfigModule } from '@nestjs/config';
import { GeminiModule } from './gemini/gemini.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    QuizModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GeminiModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/Learnpro'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
