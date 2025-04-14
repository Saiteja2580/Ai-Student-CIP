import { Routes } from '@angular/router';
import { CareerComponent } from './career.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { ResultComponent } from './result/result.component';
import { AichatComponent } from './aichat/aichat.component';

export const CareerRoutes: Routes = [
  {
    path: '',
    redirectTo: 'career-home/assessment',
    pathMatch: 'full',
  },
  {
    path: 'career-home',
    component: CareerComponent,
    children: [
      {
        path: 'assessment',
        component: AssessmentComponent,
      },
      {
        path: 'chat',
        component: AichatComponent,
      },
      {
        path: 'result',
        component: ResultComponent,
      },
    ],
  },
];
