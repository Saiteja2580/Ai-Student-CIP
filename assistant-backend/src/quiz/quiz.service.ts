import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Injectable,
} from '@nestjs/common';
import * as fs from 'fs';
import { GeminiService } from 'src/gemini/gemini.service';
import { QuizResultDto } from './dto/quiz-result.dto';
import * as pdfParse from 'pdf-parse';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { DocxLoader } from '@langchain/community/document_loaders/fs/docx';
@Injectable()
export class QuizService {
  constructor(private readonly geminiSerice: GeminiService) {}
  loader: PDFLoader | DocxLoader;

  // -------------------------------------------Generating Quiz--------------------------------------
  async generateQuiz(file, id: string) {
    const prompt = `
        Generate a quiz from the following text with 10 questions. Format the output as JSON with:
        - "topic": string (Main subject)
        - "questions": array of objects, each containing:
          - "question": string (Question text)
          - "options": array of 4 strings (MCQ choices)
          - "answer": string (Correct answer)
          
        Text:
        {text}
      `;
    //console.log(file);
    const filePath = `./public/${file.filename}`;
    let extractedtext = '';

    if (file.filename.includes('.pdf')) {
      this.loader = new PDFLoader(filePath, { parsedItemSeparator: '' });
    }
    if (file.filename.includes('.docx')) {
      this.loader = new DocxLoader(filePath);
    }
    if (file.filename.includes('doc')) {
      this.loader = new DocxLoader(filePath, { type: 'doc' });
    }

    if (this.loader) {
      const docs = await this.loader.load();
      extractedtext = docs[0].pageContent;
    }

    const quiz = await this.geminiSerice.generateResponse(
      prompt,
      extractedtext,
    );
    //console.log(quiz);

    return quiz;
  }
  // --------------------------------------------------------Submitting Quiz End Point----------------------------------------------
  async submitQuiz(id, quizResult: QuizResultDto) {
    return {
      userId: id,
      ...quizResult,
    };
  }
}
