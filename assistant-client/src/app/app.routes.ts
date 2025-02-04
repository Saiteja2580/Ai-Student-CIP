import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StudentLayoutComponent } from './pages/student-layout/student-layout.component';
import { SchedulePlannerComponent } from './pages/schedule-planner/schedule-planner.component';
import { TaskManagerComponent } from './pages/task-manager/task-manager.component';
import { QuizGeneratorComponent } from './pages/quiz-generator/quiz-generator.component';
import { PerformAnalyzerComponent } from './pages/perform-analyzer/perform-analyzer.component';
import { CareerComponent } from './pages/career/career.component';
import { ResourceComponent } from './pages/resource/resource.component';
import { authGuard } from './services/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { ErrorComponent } from './pages/error/error.component';

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
        component: QuizGeneratorComponent,
      },
      {
        path: 'performance',
        component: PerformAnalyzerComponent,
      },
      {
        path: 'resource',
        component: ResourceComponent,
      },
      {
        path: 'career',
        component: CareerComponent,
      },
    ],
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];
