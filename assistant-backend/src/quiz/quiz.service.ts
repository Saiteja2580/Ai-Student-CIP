import { Injectable, BadRequestException } from '@nestjs/common';
import { Multer } from 'multer';
import * as fs from 'fs';
import { GeminiService } from 'src/gemini/gemini.service';
import { QuizResultDto } from './dto/quiz-result.dto';
import * as pdfParse from 'pdf-parse';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { DocxLoader } from '@langchain/community/document_loaders/fs/docx';
import { InjectModel } from '@nestjs/mongoose';
import { File } from './schemas/File.schema';
import { Model } from 'mongoose';
import { CreateFileDto } from './dto/file-dto';
import path from 'path';
import { QuizResult, QuizResultSchema } from './schemas/QuizResult.schema';
import { PromptTemplate } from '@langchain/core/prompts';
import { QuizPrompt } from 'src/prompts/prompt';
@Injectable()
export class QuizService {
  createFile: CreateFileDto;
  constructor(
    private readonly geminiSerice: GeminiService,
    @InjectModel(File.name) private fileModel: Model<File>,
    @InjectModel(QuizResult.name) private quizModel: Model<QuizResult>,
  ) {}
  loader: PDFLoader | DocxLoader;

  // -------------------------------------------Generating Quiz--------------------------------------
  async generateQuiz(
    file: Multer.File,
    userId: string,
    topic: string,
    difficulty: string,
  ) {
    try {
      let extractedText: string;
      let fileSaved: boolean = false; // Flag to track if the file was saved

      // Check if the file already exists for the user
      const existingFile = await this.fileModel.findOne({
        filename: file.filename,
      });

      if (existingFile) {
        extractedText = existingFile.extractedText;
        console.log('Using existing text from database.');
      } else {
        extractedText = await this.extractTextFromFile(file);
        fileSaved = true; // Set the flag to true because a new file was saved.
      }

      const quiz = await this.generateQuizFromText(
        extractedText,
        topic,
        difficulty,
      );

      if (fileSaved) {
        // Only save if the file was new
        const createFileDto = new CreateFileDto();
        createFileDto.filename = file.filename;
        createFileDto.userId = userId;
        createFileDto.extractedText = extractedText;
        createFileDto.filetype = this.getFileType(file.filename);
        const newFile = new this.fileModel(createFileDto);
        await newFile.save();
      }

      return quiz;
    } catch (error) {
      console.error('Error generating quiz:', error);
      throw new BadRequestException('Failed to generate quiz');
    }
  }

  private async extractTextFromFile(file: Multer.File): Promise<string> {
    const filePath = `./public/${file.filename}`;
    let loader;

    if (file.filename.includes('.pdf')) {
      loader = new PDFLoader(filePath, { parsedItemSeparator: '' });
    } else if (
      file.filename.includes('.docx') ||
      file.filename.includes('.doc')
    ) {
      loader = new DocxLoader(filePath, {
        type: file.filename.includes('.doc') ? 'doc' : 'docx',
      });
    } else {
      throw new BadRequestException('Unsupported file type');
    }

    if (loader) {
      const docs = await loader.load();
      return docs.map((doc) => doc.pageContent).join(' ');
    }
    return '';
  }

  private getFileType(filename: string): string {
    return filename.includes('.pdf')
      ? '.pdf'
      : filename.includes('.docx')
        ? '.docx'
        : filename.includes('.doc')
          ? '.doc'
          : '';
  }

  private async generateQuizFromText(
    extractedText: string,
    topic: string,
    difficulty: string,
  ) {
    const prompt = PromptTemplate.fromTemplate(`
    ${QuizPrompt}
  `);

    const promptValue = await prompt.invoke({
      extractedText: extractedText,
      topic: topic,
      difficulty: difficulty,
    });

    // console.log('Prompt Value', promptValue.value);

    return await this.geminiSerice.generateResponse(promptValue.value);
  }
  // --------------------------------------------------------Submitting Quiz End Point----------------------------------------------
  async submitQuiz(id, quizData: QuizResultDto) {
    const { filename, totalQuestions, correctAnswers, percentage } = quizData;
    //console.log(filename, totalQuestions, correctAnswers, percentage);
    let file = await this.fileModel.findOne({ filename });
    if (!file) {
      throw new BadRequestException('File not found');
    }
    const score = correctAnswers;
    const quizResult = new this.quizModel({
      fileId: file._id, // Use the _id of the found or created File
      userId: id,
      totalQuestions,
      score,
      percentage,
    });
    const savedQuizResult = await quizResult.save();

    return savedQuizResult;
  }

  async getQuizById(id: string) {
    const quizResult = await this.quizModel.findById(id);
    return quizResult;
  }
}
