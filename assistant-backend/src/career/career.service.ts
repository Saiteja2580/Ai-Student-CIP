import { Injectable } from '@nestjs/common';
import { GeminiService } from '../gemini/gemini.service';
import { InjectModel } from '@nestjs/mongoose';
import { ChatHistory } from './schemas/chat-history.schema';
import { Model } from 'mongoose';

@Injectable()
export class CareerService {
  constructor(
    private readonly geminiService: GeminiService,
    @InjectModel(ChatHistory.name) private chatHistoryModel: Model<ChatHistory>,
  ) {}

  async getUserQuestion(question: string, userId: string) {
    try {
      // Use the chatAboutStudies method from GeminiService
      const response = await this.geminiService.chatAboutStudies(question);

      // Store the chat history
      const chatHistory = new this.chatHistoryModel({
        userId,
        question,
        answer: response.response,
      });
      await chatHistory.save();

      return response;
    } catch (error) {
      console.error('Error processing user question:', error);
      return {
        isEducationRelated: false,
        response:
          "I'm sorry, I encountered an error while processing your question. Please try again.",
      };
    }
  }

  async getChatHistory(userId: string) {
    return await this.chatHistoryModel.find({ userId }).sort({ createdAt: -1 });
  }
}
