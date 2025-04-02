import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Constant } from '../constants/Constant';
import { QuizResult } from '../models/quiz.model';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizServiceService {
  isQuizSubmitted: boolean = false;
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
    console.log(pdfFile);

    return this.http.post(
      `${Constant.QUIZ.GENERATE_QUIZ_URL}/${this.userId}`,
      pdfFile
    );
  }

  submitQuiz(quizResult: QuizResult) {
    

    return this.http.post(
      `${Constant.QUIZ.SUBMIT_QUIZ_URL}/${this.userId}`,
      quizResult
    );
  }

  getQuizById(id: string) {
    return this.http.get(
      `${Constant.QUIZ.QUIZ_BY_ID_URL}/${id}`
    );
  }

  quizSubmitted() {
    this.isQuizSubmitted = !this.isQuizSubmitted;
  }
}
