import { Routes } from '@angular/router';

import { DragfileComponent } from './dragfile/dragfile.component';
import { RenderquizComponent } from './renderquiz/renderquiz.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];
