import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Constant } from '../constants/Constant';
import { QuizForm } from '../models/quiz';

@Injectable({
  providedIn: 'root',
})
export class QuizServiceService {
  http = inject(HttpClient);

  getQuizQuetsions(quizData: QuizForm) {
    return this.http.post(`${Constant.API_URL}${Constant.QUIZ_URL}`, quizData);
  }
}
