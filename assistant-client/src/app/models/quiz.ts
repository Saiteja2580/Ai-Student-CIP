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
