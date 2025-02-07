import { Injectable } from '@nestjs/common';
import { GenerateQuizDto } from './dto/generate-quiz.dto';
import { GeminiService } from 'src/gemini/gemini.service';
import { QuizResultDto } from './dto/quiz-result.dto';
@Injectable()
export class QuizService {
  constructor(private readonly geminiSerice: GeminiService) {}

  async generateQuiz(topic: GenerateQuizDto) {
    const prompt = `Generate a quiz with 10 multiple-choice questions on the topic "${topic.topicName}" with a "${topic.difficulty}" difficulty level. The questions should be "${topic.type}" (either theoretical or numerical). Ensure the questions are relevant to the topic and difficulty level.

    Each question should have 4 options (A, B, C, D), with one correct answer. If the question type is "numerical," include calculations or numerical problem-solving aspects. If the type is "theoretical," focus on concepts and definitions.

  Return the response in JSON format like:
    [
  {
    "question": "Question text?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": ["Option A","A"]
  }
  ]

  Dont Change Respopnse Format
`;

    const quiz = await this.geminiSerice.generateResponse(prompt);
    //console.log(quiz);

    return {
      topicName: topic.topicName,
      quiz,
    };
  }

  async submitQuiz(id, quizResult: QuizResultDto) {
    return quizResult;
  }
}
