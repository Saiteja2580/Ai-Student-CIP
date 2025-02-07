export class QuizForm {
  topicName: string;
  difficulty: string;
  type: string;

  constructor() {
    this.topicName = '';
    this.difficulty = '';
    this.type = '';
  }
}

export class QuizQuestion {
  question: string;
  options: string[];
  answer: string;

  constructor() {
    this.question = '';
    this.options = ['', '', '', ''];
    this.answer = '';
  }
}

export class QuizResponse {
  topicName: string;
  quiz: QuizQuestion[];

  constructor() {
    this.topicName = '';
    this.quiz = Array.from({ length: 5 }, () => new QuizQuestion());
  }
}

export class QuizData {
  topicName: string;
  answers: string[];

  constructor() {
    this.topicName = '';
    this.answers = new Array(10);
  }
}

export class QuizResult {
  topic: string;
  difficulty: string;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  questions: QuizQuestion[];

  constructor(result: {
    topic: string;
    difficulty: string;
    totalQuestions: number;
    correctAnswers: number;
    percentage: number;
    questions: QuizQuestion[];
  }) {
    this.topic = result.topic;
    this.difficulty = result.difficulty;
    this.totalQuestions = result.totalQuestions;
    this.correctAnswers = result.correctAnswers;
    this.percentage = result.percentage;
    this.questions = result.questions;
  }
}
