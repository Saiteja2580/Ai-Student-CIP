import { Component, computed, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ScheduleService } from '../../services/schedule.service';
import { QuizServiceService } from '../../services/quiz.service';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-perform-analyzer',
  imports: [DatePipe, NgClass],
  templateUrl: './perform-analyzer.component.html',
  styleUrl: './perform-analyzer.component.css',
})
export class PerformAnalyzerComponent {
  taskService = inject(TaskService);
  scheduleService = inject(ScheduleService);
  quizService = inject(QuizServiceService);

  taskCount = computed(() => this.taskService.taskList$.length);
  scheduleCount = computed(() => this.scheduleService.schedules$.length);
  quizCount = computed(() => this.quizService.totalQuizAttempts.length);
}
