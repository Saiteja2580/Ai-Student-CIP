import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';

import { ConfigModule } from '@nestjs/config';
import { GeminiModule } from './gemini/gemini.module';
import { AuthModule } from './auth/auth.module';

import { DatabaseModule } from './database/database.module';


@Module({
  imports: [
    QuizModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    GeminiModule,

    AuthModule,

    

    DatabaseModule,

    

    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
