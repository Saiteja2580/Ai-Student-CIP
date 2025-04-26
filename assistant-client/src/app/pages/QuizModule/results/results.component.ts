import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizServiceService } from '../../../services/quiz.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-results',
  imports: [SpinnerComponent, NgIf],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
})
export class ResultsComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  quizService = inject(QuizServiceService);
  spinnerService = inject(NgxSpinnerService);

  isLoading = false;
  quizId: any;
  quizResult: any;

  feedbackMessage: string = '';
  scoreColor: string = '';

  ngOnInit(): void {
    this.spinnerService.show();
    this.route.paramMap.subscribe((params) => {
      this.quizId = params.get('id');
      console.log('Quiz ID:', this.quizId);

      // You can now use this.quizId to fetch data or perform any logic
    });
    this.getQuizById();
    this.calculateResults();
  }

  getQuizById() {
    this.isLoading = true;
    this.quizService.getQuizById(this.quizId).subscribe({
      next: (res: any) => {
        this.quizResult = res;
        console.log(this.quizResult);
        this.isLoading = false;
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }

  calculateResults() {
    // Feedback Message and Color
    if (this.quizResult.percentage >= 80) {
      this.feedbackMessage = 'Excellent Work!';
    } else if (this.quizResult.percentage >= 50) {
      this.feedbackMessage = 'Good Effort!';
    } else {
      this.feedbackMessage = 'Keep Practicing!';
    }
  }

  onTryAgain() {
    this.router.navigateByUrl('/quiz/dragfile');
  }
}
