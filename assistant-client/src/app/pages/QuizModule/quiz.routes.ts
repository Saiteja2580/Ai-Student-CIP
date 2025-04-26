import { Routes } from '@angular/router';

import { DragfileComponent } from './dragfile/dragfile.component';
import { RenderquizComponent } from './renderquiz/renderquiz.component';
import { ResultsComponent } from './results/results.component';
import { quizGenerateGuard } from './guards/quiz-generate.guard';
import { quizValidateGuard } from './guards/quiz-validate.guard';

export const QuizRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dragfile',
    pathMatch: 'full',
  },
  {
    path: 'dragfile',
    component: DragfileComponent,
  },
  {
    path: 'renderquiz',
    component: RenderquizComponent,
    canActivate: [quizGenerateGuard],
  },
  {
    path: 'dashboard/:id',
    component: ResultsComponent,
    canActivate: [quizValidateGuard],
  },
];
