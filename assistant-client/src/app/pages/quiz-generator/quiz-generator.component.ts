import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormsModule,
  NgModel,
  Validators,
} from '@angular/forms';
import {
  QuizForm,
  QuizQuestion,
  QuizData,
  QuizResponse,
  QuizResult,
} from '../../models/quiz';
import { QuizServiceService } from '../../services/quiz-service.service';
import e from 'cors';
import { NgFor, NgIf } from '@angular/common';
import {
  NgxSpinnerComponent,
  NgxSpinnerModule,
  NgxSpinnerService,
} from 'ngx-spinner';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-quiz-generator',
  imports: [
    ReactiveFormsModule,
    NgFor,
    FormsModule,
    NgxSpinnerModule,
    SpinnerComponent,
    NgIf,
  ],
  templateUrl: './quiz-generator.component.html',
  styleUrl: './quiz-generator.component.css',
})
export class QuizGeneratorComponent implements OnInit {
  isLoading = false;
  time = 300;
  displayTime = '5:00';
  quizStarted = false;
  userId: any;
  authService = inject(AuthService);
  quizService = inject(QuizServiceService);
  spinnerService = inject(NgxSpinnerService);
  quizScore: number = 0;

  quizForm: FormGroup = new FormGroup({
    topicName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    difficulty: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });
  quizFormData: QuizForm = new QuizForm();
  quizData: QuizData = new QuizData();
  quizResponse: QuizResponse = new QuizResponse();
  quizResult: QuizResult | any;

  ngOnInit(): void {
    this.spinnerService.show();
    this.startTimer();
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.userId = user.sub;
      }
    });
  }

  generateQuiz() {
    this.isLoading = true;
    this.quizFormData = this.quizForm.value;
    this.quizService.getQuizQuetsions(this.quizFormData).subscribe({
      next: (res: any) => {
        //console.log(res);

        this.quizResponse = res;
        this.quizStarted = true;
        this.isLoading = false;
      },
      error: (err: any) => {
        // ✅ Corrected error handling
        alert(err.message);
      },
    });

    this.quizForm.reset();
  }
  startQuiz() {
    this.generateQuiz();
  }

  submitQuiz(form: any) {
    if (form.invalid) {
      alert('Select answers for all Questions');
      return;
    }
    this.quizData.topicName = this.quizResponse.topicName;
    this.quizScore = this.validateQuizAnswers();
    let result = {
      topic: this.quizResponse.topicName,
      difficulty: this.quizFormData.difficulty,
      totalQuestions: this.quizResponse.quiz.length,
      correctAnswers: this.quizScore,
      percentage: (this.quizScore / this.quizResponse.quiz.length) * 100,
      questions: this.quizResponse.quiz,
    };
    this.quizResult = new QuizResult(result);
    //console.log(this.quizResult);
    this.submitResultToBackend();
  }

  submitResultToBackend() {
    this.quizService.submitQuiz(this.quizResult).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }

  validateQuizAnswers() {
    let correctAnswers = this.quizResponse.quiz.filter((q, index) => {
      return q.answer[0] === this.quizData.answers[index];
    });

    return correctAnswers.length;
  }

  startTimer() {
    const interval = setInterval(() => {
      if (this.time > 0) {
        this.time--;
        this.updateDisplayTime();
      } else {
        clearInterval(interval); // Stop the timer once it reaches zero
      }
    }, 1000);
  }

  updateDisplayTime() {
    const minutes = Math.floor(this.time / 60);
    const seconds = this.time % 60;
    this.displayTime = `${minutes}:${seconds}`;
  }
}
