import { Component, computed, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ScheduleService } from '../../services/schedule.service';
import { QuizServiceService } from '../../services/quiz.service';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe, NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  taskService = inject(TaskService);
  scheduleService = inject(ScheduleService);
  quizService = inject(QuizServiceService);

  taskCount = computed(() => this.taskService.taskList$.length);
  scheduleCount = computed(() => this.scheduleService.schedules$.length);
  quizCount = computed(() => this.quizService.totalQuizAttempts.length);
}
