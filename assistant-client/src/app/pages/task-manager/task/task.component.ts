import { Component, inject, Input } from '@angular/core';
import { TaskResponse } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  taskService = inject(TaskService);
  @Input({ required: true }) task!: TaskResponse;

  onComplete(taskId: string, status: string) {
    this.taskService.updateStatus(taskId, status);
  }
}
