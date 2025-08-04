import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';

import { ConfigModule } from '@nestjs/config';
import { GeminiModule } from './gemini/gemini.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from './schedule/schedule.module';
import { TaskModule } from './task/task.module';


import { CareerModule } from './career/career.module';

@Module({
  imports: [
    QuizModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GeminiModule,
    AuthModule,
    MongooseModule.forRoot('mongodb+srv://saitejassp2580:Saiteja1964@cluster0.lxqpi9w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    ScheduleModule,
    TaskModule,
    CareerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
