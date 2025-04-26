import { Injectable } from '@nestjs/common';
import { GenerativeModel } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { CareerChatPrompt } from 'src/prompts/prompt';

@Injectable()
export class GeminiService {
  private readonly genAI: ChatGoogleGenerativeAI;
  private readonly model: GenerativeModel;
  constructor(config: ConfigService) {
    const apiKey = config.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GOOGLE_API_KEY is not defined');
    }
    //consol('API Key:', apiKey);

    this.genAI = new ChatGoogleGenerativeAI({
      apiKey: apiKey,
      model: 'gemini-2.0-flash',
      maxRetries: 2,
      temperature: 0.9,
    });
  }

  async generateResponse(prompt: string) {
    // console.log(typeof prompt);

    const response = await this.genAI.invoke(prompt);
    const jsonResponse = response.content as string;
    const cleanResponse = jsonResponse.replace(/```json|```/g, '').trim();

    // Parse the cleaned response into JSON
    const quiz = JSON.parse(cleanResponse);
    // console.log(quiz);

    return quiz;
  }

  async generateSchedule(prompt: string) {
    // console.log(prompt);

    const response = await this.genAI.invoke(prompt);
    const jsonResponse = response.content as string;
    const cleanResponse = jsonResponse.replace(/```json|```/g, '').trim();

    const schedule = JSON.parse(cleanResponse);

    return schedule;
  }

  /**
   * General chatbot function that handles study-related questions
   * @param question The user's question
   * @returns A response object with guidance
   */
  async chatAboutStudies(question: string) {
    const systemPrompt = `
      ${CareerChatPrompt}
    `;

    const fullPrompt = `${systemPrompt}\n\nUser Question: ${question}`;

    try {
      const response = await this.genAI.invoke(fullPrompt);

      const jsonResponse = response.content as string;
      const cleanResponse = jsonResponse.replace(/```json|```/g, '').trim();

      return JSON.parse(cleanResponse);
    } catch (error) {
      console.error('Error in study chatbot:', error);
      return {
        isEducationRelated: false,
        response:
          "I'm sorry, I encountered an error while processing your question. Please try again with a question about your studies.",
      };
    }
  }

  async generateRoadmap(prompt: string) {
    try {
      const response = await this.genAI.invoke(prompt);
      const jsonResponse = response.content as string;
      const cleanResponse = jsonResponse.replace(/```json|```/g, '').trim();
      return JSON.parse(cleanResponse);
    } catch (error) {
      console.error('Error generating roadmap:', error);
      throw new Error('Failed to generate roadmap. Please try again.');
    }
  }
}
