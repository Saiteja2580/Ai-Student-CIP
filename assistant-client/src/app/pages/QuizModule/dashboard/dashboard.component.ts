import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizServiceService } from '../../../services/quiz.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  quizId: any;
  quizResult: any;

  route = inject(ActivatedRoute);
  router = inject(Router)
  quizService = inject(QuizServiceService);

  feedbackMessage: string = '';
  scoreColor: string = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.quizId = params.get('id');
      console.log('Quiz ID:', this.quizId);

      // You can now use this.quizId to fetch data or perform any logic
    });
    this.getQuizById();
    this.calculateResults();
  }

  getQuizById() {
    this.quizService.getQuizById(this.quizId).subscribe({
      next: (res: any) => {
        this.quizResult = res;
        console.log(this.quizResult);
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
