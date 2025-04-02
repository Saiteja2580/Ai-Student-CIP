// export class QuizForm {
//   topicName: string;
//   difficulty: string;
//   type: string;

//   constructor() {
//     this.topicName = '';
//     this.difficulty = '';
//     this.type = '';
//   }
// }

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
  topic: string;
  questions: QuizQuestion[];

  constructor() {
    this.topic = '';
    this.questions = Array.from({ length: 5 }, () => new QuizQuestion());
  }
}

// export class QuizData {
//   topicName: string;
//   answers: string[];

//   constructor() {
//     this.topicName = '';
//     this.answers = new Array(10);
//   }
// }

export class QuizResult {
  topic: string;
  filename: string;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;

  constructor(result: {
    topic: string;
    filename: string;
    totalQuestions: number;
    correctAnswers: number;
    percentage: number;
  }) {
    this.topic = result.topic;
    this.filename = result.filename;
    this.totalQuestions = result.totalQuestions;
    this.correctAnswers = result.correctAnswers;
    this.percentage = result.percentage;
  }
}
