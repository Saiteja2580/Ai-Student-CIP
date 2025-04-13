import { Module } from '@nestjs/common';
import { CareerService } from './career.service';
import { CareerController } from './career.controller';
import { GeminiModule } from 'src/gemini/gemini.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatHistory, ChatHistorySchema } from './schemas/chat-history.schema';

@Module({
  imports: [
    GeminiModule,
    MongooseModule.forFeature([
      { name: ChatHistory.name, schema: ChatHistorySchema },
    ]),
  ],
  controllers: [CareerController],
  providers: [CareerService],
})
export class CareerModule {}
