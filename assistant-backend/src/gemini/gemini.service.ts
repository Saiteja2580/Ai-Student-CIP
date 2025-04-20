import { Injectable } from '@nestjs/common';
import { GenerativeModel } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
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
   * Generates a response for career and study guidance questions
   * @param question The user's question
   * @returns A response object with guidance
   */
  // async generateCareerGuidance(question: string) {
  //   const systemPrompt = `
  //     You are a career and study guidance assistant. Your role is to provide helpful advice on education, career paths, and academic planning.
  //     You should ONLY answer questions related to:
  //     - Educational guidance
  //     - Career paths and opportunities
  //     - Study techniques and strategies
  //     - Academic planning
  //     - College and university information
  //     - Professional development

  //     If the question is not related to education or career, respond with a message explaining that you can only provide guidance on educational and career topics.

  //     Format your response as a JSON object with the following structure:
  //     {
  //       "isRelevant": boolean,
  //       "response": string,
  //       "suggestions": string[] (optional, only if relevant)
  //     }
  //   `;

  //   const fullPrompt = `${systemPrompt}\n\nUser Question: ${question}`;

  //   try {
  //     const response = await this.genAI.invoke(fullPrompt);
  //     const jsonResponse = response.content as string;
  //     const cleanResponse = jsonResponse.replace(/```json|```/g, '').trim();

  //     return JSON.parse(cleanResponse);
  //   } catch (error) {
  //     console.error('Error generating career guidance:', error);
  //     return {
  //       isRelevant: false,
  //       response:
  //         "I'm sorry, I encountered an error while processing your question. Please try again with a question related to education or career guidance.",
  //     };
  //   }
  // }

  /**
   * Generates study tips based on the subject and user's current situation
   * @param subject The subject the user needs help with
   * @param currentSituation Brief description of the user's current situation
   * @returns Study tips and recommendations
   */
  // async generateStudyTips(subject: string, currentSituation: string) {
  //   const systemPrompt = `
  //     You are a study guidance assistant. Provide specific, actionable study tips for the given subject and situation.

  //     Format your response as a JSON object with the following structure:
  //     {
  //       "subject": string,
  //       "tips": string[],
  //       "resources": string[],
  //       "timeManagement": string
  //     }
  //   `;

  //   const fullPrompt = `${systemPrompt}\n\nSubject: ${subject}\nCurrent Situation: ${currentSituation}`;

  //   try {
  //     const response = await this.genAI.invoke(fullPrompt);
  //     const jsonResponse = response.content as string;
  //     const cleanResponse = jsonResponse.replace(/```json|```/g, '').trim();

  //     return JSON.parse(cleanResponse);
  //   } catch (error) {
  //     console.error('Error generating study tips:', error);
  //     return {
  //       subject: subject,
  //       tips: [
  //         "I'm sorry, I encountered an error while generating study tips. Please try again.",
  //       ],
  //       resources: [],
  //       timeManagement:
  //         'Unable to generate time management advice at this time.',
  //     };
  //   }
  // }

  /**
   * Provides career path recommendations based on user interests and skills
   * @param interests User's interests
   * @param skills User's skills
   * @param educationLevel Current education level
   * @returns Career recommendations
   */
  // async generateCareerRecommendations(
  //   interests: string,
  //   skills: string,
  //   educationLevel: string,
  // ) {
  //   const systemPrompt = `
  //     You are a career guidance assistant. Based on the user's interests, skills, and education level, recommend suitable career paths.

  //     Format your response as a JSON object with the following structure:
  //     {
  //       "recommendedCareers": [
  //         {
  //           "title": string,
  //           "description": string,
  //           "requiredEducation": string,
  //           "growthPotential": string
  //         }
  //       ],
  //       "nextSteps": string[],
  //       "additionalEducation": string[]
  //     }
  //   `;

  //   const fullPrompt = `${systemPrompt}\n\nInterests: ${interests}\nSkills: ${skills}\nEducation Level: ${educationLevel}`;

  //   try {
  //     const response = await this.genAI.invoke(fullPrompt);
  //     const jsonResponse = response.content as string;
  //     const cleanResponse = jsonResponse.replace(/```json|```/g, '').trim();

  //     return JSON.parse(cleanResponse);
  //   } catch (error) {
  //     console.error('Error generating career recommendations:', error);
  //     return {
  //       recommendedCareers: [],
  //       nextSteps: [
  //         "I'm sorry, I encountered an error while generating career recommendations. Please try again.",
  //       ],
  //       additionalEducation: [],
  //     };
  //   }
  // }

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
}
