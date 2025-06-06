import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StudentLayoutComponent } from './pages/student-layout/student-layout.component';
import { SchedulePlannerComponent } from './pages/schedule-planner/schedule-planner.component';
import { TaskManagerComponent } from './pages/task-manager/task-manager.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './services/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { ErrorComponent } from './pages/error/error.component';
import { QuizRoutes } from './pages/QuizModule/quiz.routes';
import { CareerRoutes } from './pages/career/career.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    component: StudentLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'schedule',
        component: SchedulePlannerComponent,
      },
      {
        path: 'task',
        component: TaskManagerComponent,
      },
      {
        path: 'quiz',
        children: QuizRoutes,
      },
      {
        path: 'performance',
        component: DashboardComponent,
      },

      {
        path: 'career',
        children: CareerRoutes,
      },
    ],
  },

  // {
  //   path:'quizmodule',children:QuizRoutes
  // },
  {
    path: '**',
    component: ErrorComponent,
  },
];
