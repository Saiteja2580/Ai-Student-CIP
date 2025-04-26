import { Component, inject } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { AuthService } from '@auth0/auth0-angular';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-manager',
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.css',
})
export class TaskManagerComponent {
  authService = inject(AuthService);
  taskService = inject(TaskService);

  tasks: any = [];
  addTask = false;
  userName!: string;

  onAddTask() {
    this.addTask = true;
  }

  constructor() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.userName = user.name!;
        // Fetch schedules when user logs in
      }
    });
    this.tasks = this.taskService.taskList$;
  }

  onCloseForm(closeForm: boolean) {
    this.addTask = closeForm;
  }
}
