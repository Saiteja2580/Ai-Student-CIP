import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizServiceService } from '../../../services/quiz.service';
import {
  QuizQuestion,
  QuizResponse,
  QuizResult,
} from '../../../models/quiz.model';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-renderquiz',
  imports: [NgIf, NgFor, NgClass, SpinnerComponent, FormsModule],
  templateUrl: './renderquiz.component.html',
  styleUrl: './renderquiz.component.css',
})
export class RenderquizComponent implements OnInit {
  spinnerService = inject(NgxSpinnerService);
  quizService = inject(QuizServiceService);
  router = inject(Router);

  isLoading = false;
  file: File | null = null;
  showFeedbackModal: boolean = false;
  selectedDifficulty: string = '';
  selectedAnswers: { [key: number]: string } = {};

  quizResponse: QuizResponse | undefined;
  quizQuestions: QuizQuestion | any;
  quizResult: QuizResult | any;
  filename: string | any;
  quizScore: number = 0;

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
        this.file = quizResponse.file;
        this.totalPages = Math.ceil(
          this.quizQuestions.length / this.questionsPerPage
        );
      }
    });
  }

  handleDifficultySelection(difficulty: string) {
    this.selectedDifficulty = difficulty;
    console.log('Selected difficulty:', difficulty);
  }

  regenerateQuestions() {
    if (this.selectedDifficulty === 'Hard') {
      this.isLoading = true;
      console.log('Regenerating questions with higher difficulty');
      this.spinnerService.show();

      // Create FormData with the file and topic
      const formData = new FormData();
      if (this.file) {
        formData.append('file', this.file);
      }
      if (this.quizResponse?.topic) {
        formData.append('topic', this.quizResponse.topic);
      }
      formData.append('difficulty', 'Advanced Numericals & Theatrical Answers');
      console.log('formData', formData);

      // Call the service to generate new questions
      this.quizService.getQuizQuetsions(formData).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.quizResponse = response;
          this.quizQuestions = response.questions;
          this.filename = response.filename;
          this.selectedAnswers = {}; // Reset selected answers
          this.currentPage = 1; // Reset to first page
          this.totalPages = Math.ceil(
            this.quizQuestions.length / this.questionsPerPage
          );
          this.spinnerService.hide();
        },
        error: (error) => {
          console.error('Error regenerating questions:', error);
          alert('Failed to regenerate questions. Please try again.');
          this.spinnerService.hide();
        },
      });

      this.showFeedbackModal = false;
      this.selectedDifficulty = '';
    } else {
      console.log(
        'No regeneration needed. Difficulty level:',
        this.selectedDifficulty
      );
      this.showFeedbackModal = false;
      this.selectedDifficulty = '';
    }
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
    console.log(this.file);

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
        filename: this.file?.name ?? '',
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
