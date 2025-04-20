import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizServiceService } from '../../../services/quiz.service';
import {
  QuizQuestion,
  QuizResponse,
  QuizResult,
} from '../../../models/quiz.model';
import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerComponent } from "../../../shared/spinner/spinner.component";

@Component({
  selector: 'app-renderquiz',
  imports: [NgIf, NgFor, NgClass, SpinnerComponent],
  templateUrl: './renderquiz.component.html',
  styleUrl: './renderquiz.component.css',
})
export class RenderquizComponent implements OnInit {
  isLoading = false;
  spinnerService = inject(NgxSpinnerService);
  quizService = inject(QuizServiceService);
  quizResponse: QuizResponse | undefined;
  quizQuestions: QuizQuestion | any;
  quizResult: QuizResult | any;
  filename: string | any;
  quizScore: number = 0;
  router = inject(Router);
  selectedAnswers: { [key: number]: string } = {};

  // Pagination properties
  currentPage: number = 1;
  questionsPerPage: number = 1;
  totalPages: number = 0;

  ngOnInit(): void {
    this.spinnerService.show();
    this.quizService.quizData$.subscribe((quizResponse) => {
      if (quizResponse) {
        this.quizResponse = quizResponse;
        this.quizQuestions = quizResponse.questions;
        this.filename = quizResponse.filename;
        this.totalPages = Math.ceil(
          this.quizQuestions.length / this.questionsPerPage
        );
      }
    });
  }

  selectAnswer(questionIndex: number, selectedOption: string) {
    this.selectedAnswers[questionIndex] = selectedOption;
  }

  // Pagination methods
  getCurrentPageQuestions(): any[] {
    const startIndex = (this.currentPage - 1) * this.questionsPerPage;
    const endIndex = startIndex + this.questionsPerPage;
    return this.quizQuestions.slice(startIndex, endIndex);
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onSubmit() {
    this.isLoading = true;
    if (Object.keys(this.selectedAnswers).length < this.quizQuestions.length) {
      alert('Please answer all questions before submitting');
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
        totalQuestions: this.quizQuestions.length,
        correctAnswers: this.quizScore,
        percentage: (this.quizScore / this.quizQuestions.length) * 100,
      });
      // -------------------------senidng quizresult to backemd----------------------------
      this.quizService.submitQuiz(this.quizResult).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.quizService.quizSubmitted();
          let quizId = res._id;
          console.log(res._id);
          this.router.navigate(['/quiz/dashboard', quizId]);
        },
        error: (err) => {
          alert(err.message);
          this.isLoading = false;
        },
      });
    }
  }
}
