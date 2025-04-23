import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit, signal } from '@angular/core';
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

  // Signal for total quiz attempts array
  private totalQuizAttemptsSignal = signal<QuizResult[]>([]);

  // Getter for total quiz attempts
  get totalQuizAttempts() {
    return this.totalQuizAttemptsSignal();
  }

  setQuizData(data: any) {
    this.quizDataSource.next(data);
  }

  authService = inject(AuthService);
  userId: any;
  constructor() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.userId = user.sub;
        // Load quiz data when user is authenticated
        this.totalQuizAttempted();
      }
    });
  }

  http = inject(HttpClient);

  totalQuizAttempted() {
    return this.http
      .get<QuizResult[]>(
        `${Constant.QUIZ.TOTAL_QUIZ_ATTEMPTED_URL}/${this.userId}`
      )
      .subscribe((response) => {
        console.log('response', response);
        this.totalQuizAttemptsSignal.set(response);
      });
  }

  getQuizQuetsions(formData: FormData) {
    console.log('Form Data from quiz service', formData);

    return this.http.post(
      `${Constant.QUIZ.GENERATE_QUIZ_URL}/${this.userId}`,
      formData
    );
  }

  submitQuiz(quizResult: QuizResult) {
    console.log('quizResult', quizResult);

    return this.http.post(
      `${Constant.QUIZ.SUBMIT_QUIZ_URL}/${this.userId}`,
      quizResult
    );
  }

  getQuizById(id: string) {
    return this.http.get(`${Constant.QUIZ.QUIZ_BY_ID_URL}/${id}`);
  }

  quizSubmitted() {
    this.isQuizSubmitted = !this.isQuizSubmitted;
  }
}
