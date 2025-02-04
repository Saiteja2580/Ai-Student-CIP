import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiService {
  private readonly genAI: GoogleGenerativeAI;
  private readonly model: GenerativeModel;
  constructor(config: ConfigService) {
    const apiKey = config.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GOOGLE_API_KEY is not defined');
    }
    //console.log('API Key:', apiKey);

    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async generateResponse(prompt: string) {
    const result = await this.model.generateContent(prompt);

    const cleanResponse = result.response
      .text()
      .replace(/```json|```/g, '')
      .trim();

    // Parse the cleaned response into JSON
    const quiz = JSON.parse(cleanResponse);
    // console.log(quiz);

    return quiz;
  }
}
