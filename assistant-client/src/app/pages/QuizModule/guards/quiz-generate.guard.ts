import { CanActivateFn, Router } from '@angular/router';
import { QuizServiceService } from '../../../services/quiz.service';
import { inject } from '@angular/core';
import { first, map } from 'rxjs';

export const quizGenerateGuard: CanActivateFn = (route, state) => {
  const quizService = inject(QuizServiceService);
  const router = inject(Router);

  return quizService.quizData$.pipe(
    first(),
    map((question) => {
      if (question) {
        console.log(question);
        return true;
      } else {
        router.navigateByUrl('/quiz/dragfile');
        return false;
      }
    })
  );
};
