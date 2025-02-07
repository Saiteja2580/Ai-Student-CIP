import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Constant } from '../constants/Constant';
import { QuizForm, QuizResult } from '../models/quiz';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class QuizServiceService {
  authService = inject(AuthService);
  userId: any;
  constructor() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.userId = user.sub;
      }
    });
  }

  http = inject(HttpClient);

  getQuizQuetsions(quizData: QuizForm) {
    return this.http.post(
      `${Constant.API_URL}${Constant.QUIZ.GENERATE_QUIZ_URL}`,
      quizData
    );
  }

  submitQuiz(quizResult: QuizResult) {
    return this.http.post(
      `${Constant.API_URL}${Constant.QUIZ.SUBMIT_QUIZ_URL}/${this.userId}`,
      quizResult
    );
  }
}
