import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { QuizServiceService } from '../../../services/quiz.service';

export const quizValidateGuard: CanActivateFn = (route, state) => {
  const quizService = inject(QuizServiceService);
  const router = inject(Router);

  if (quizService.isQuizSubmitted) {
    return true;
  } else {
    router.navigateByUrl('/quiz/dragfile');
    return false;
  }
};
