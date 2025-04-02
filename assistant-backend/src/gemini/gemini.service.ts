import { Injectable } from '@nestjs/common';
import {  GenerativeModel } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';


import { PromptTemplate } from '@langchain/core/prompts';

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

  async generateResponse(prompt: string, extractedText: string) {
    console.log(typeof extractedText);

    const promptTemplate = new PromptTemplate({
      template: prompt,
      inputVariables: ['text'],
    });

    const formattedPrompt = await promptTemplate.format({
      text: extractedText,
    });
    //console.log(formattedPrompt);

    const response = await this.genAI.invoke(formattedPrompt);
    const jsonResponse = response.content as string;
    const cleanResponse = jsonResponse.replace(/```json|```/g, '').trim();

    // Parse the cleaned response into JSON
    const quiz = JSON.parse(cleanResponse);
    //console.log(quiz);

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
}
