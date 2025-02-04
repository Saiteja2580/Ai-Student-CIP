import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { QuizForm, QuizQuestion } from '../../models/quiz';
import { QuizServiceService } from '../../services/quiz-service.service';
import e from 'cors';
import { NgFor, NgIf } from '@angular/common';
import {
  NgxSpinnerComponent,
  NgxSpinnerModule,
  NgxSpinnerService,
} from 'ngx-spinner';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-quiz-generator',
  imports: [
    ReactiveFormsModule,
    NgFor,

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
  quizService = inject(QuizServiceService);
  spinnerService = inject(NgxSpinnerService);
  quizForm: FormGroup = new FormGroup({
    topicName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    difficulty: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });
  quizFormData: QuizForm = new QuizForm();
  quizResponse: any;

  ngOnInit(): void {
    this.spinnerService.show();
    this.startTimer();
  }

  generateQuiz() {
    this.isLoading = true;
    this.quizFormData = this.quizForm.value;
    this.quizService.getQuizQuetsions(this.quizFormData).subscribe({
      next: (res: any) => {
        console.log(res);
        
        this.quizResponse = res;
        this.quizStarted = true;
        this.isLoading = false;
      },
      error: (err: any) => {
        // ✅ Corrected error handling
        console.log(err);
      },
    });

    this.quizForm.reset();
  }
  startQuiz() {
    this.generateQuiz();
  }

  submitQuiz() {
    console.log('Quiz Submitted');
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
