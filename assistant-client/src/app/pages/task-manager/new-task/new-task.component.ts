import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskData } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule, CommonModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  taskData: TaskData = {
    userId: '',
    title: '',
    summary: '',
    dueDate: '',
  };

  taskService = inject(TaskService);

  @Output() closeForm = new EventEmitter<boolean>(true);

  onSubmit() {
    if (this.checkValidation) {
      return alert('Enter all Fields Correctly');
    }
    this.taskService.addTask(this.taskData);
    this.closeForm.emit(false);
  }

  get checkValidation() {
    return (
      this.taskData.dueDate === '' ||
      this.taskData.summary === '' ||
      this.taskData.title === ''
    );
  }

  onCancel() {
    this.closeForm.emit(false);
  }
}
