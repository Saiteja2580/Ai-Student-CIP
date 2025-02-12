import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizServiceService } from '../../../services/quiz-service.service';
import { QuizQuestion, QuizResponse, QuizResult } from '../../../models/quiz';
import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-renderquiz',
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './renderquiz.component.html',
  styleUrl: './renderquiz.component.css',
})
export class RenderquizComponent implements OnInit {
  quizService = inject(QuizServiceService);
  quizResponse: QuizResponse | undefined;
  quizQuestions: QuizQuestion | any;
  quizResult: QuizResult | any;
  filename: string | any;
  quizScore: number = 0;
  router = inject(Router);
  selectedAnswers: { [key: number]: string } = {};
  ngOnInit(): void {
    this.quizService.quizData$.subscribe((quizResponse) => {
      if (quizResponse) {
        this.quizResponse = quizResponse; // Assign received data to a variable
        this.quizQuestions = quizResponse.questions;
        this.filename = quizResponse.filename;
      }
    });
  }

  selectAnswer(questionIndex: number, selectedOption: string) {
    this.selectedAnswers[questionIndex] = selectedOption; // Store selected option
  }

  onSubmit() {
    if (Object.keys(this.selectedAnswers).length < 10) {
      alert('Answer All Questions');
    } else {
      for (const questionId in this.selectedAnswers) {
        if (
          this.selectedAnswers[questionId] ===
          this.quizQuestions[questionId].answer
        ) {
          this.quizScore++;
        }
      }
      this.quizResult = new QuizResult({
        topic: this.quizResponse?.topic ?? 'Unknown Topic',
        filename: this.filename,
        totalQuestions: 10,
        correctAnswers: this.quizScore,
        percentage: (this.quizScore / 10) * 100,
      });
      // -------------------------senidng quizresult to backemd----------------------------
      this.quizService.submitQuiz(this.quizResult).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          alert(err.message);
        },
      });
    }
  }
}
