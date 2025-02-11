import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Constant } from '../constants/Constant';
import { QuizResult } from '../models/quiz';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizServiceService {
  private quizDataSource = new BehaviorSubject<any>(null);
  quizData$ = this.quizDataSource.asObservable();

  setQuizData(data: any) {
    this.quizDataSource.next(data);
  }

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

  getQuizQuetsions(pdfFile: FormData) {
    //console.log(pdfFile);

    return this.http.post(
      `${Constant.API_URL}${Constant.QUIZ.GENERATE_QUIZ_URL}/${this.userId}`,
      pdfFile
    );
  }

  submitQuiz(quizResult: QuizResult) {
    return this.http.post(
      `${Constant.API_URL}${Constant.QUIZ.SUBMIT_QUIZ_URL}/${this.userId}`,
      quizResult
    );
  }
}
