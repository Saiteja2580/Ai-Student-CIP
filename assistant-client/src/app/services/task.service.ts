import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { TaskData, TaskResponse } from '../models/task.model';
import { AuthService } from '@auth0/auth0-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from '../constants/Constant';
import { finalize, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  http = inject(HttpClient);

  tasks = signal<TaskResponse[]>([]);
  isloading = signal<boolean>(false);
  authService = inject(AuthService);
  spinnerService = inject(NgxSpinnerService);
  userId!: string;

  constructor() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.userId = user.sub!;
        this.getTaskById(this.userId); // Fetch schedules when user logs in
      }
    });
  }

  // ✅ Getter for loading state
  get loading$() {
    return this.isloading;
  }

  // ✅ Getter to access the schedules signal
  get taskList$() {
    return this.tasks();
  }

  private showSpinner() {
    this.isloading.set(true);
    this.spinnerService.show();
  }

  private hideSpinner() {
    this.isloading.set(false);
    this.spinnerService.hide();
  }

  getTaskById(userId: string) {
    this.showSpinner();

    return this.http
      .get(`${Constant.TASK.GET_TASK_URL}/${userId}`)
      .pipe(
        tap((res) => this.tasks.set(res as TaskResponse[])),
        finalize(() => this.hideSpinner())
      )
      .subscribe({
        next: (res) => {
          this.tasks.set(res as TaskResponse[]);
          console.log(this.taskList$);
        },
        error: (err) => alert(err.message),
      });
  }

  addTask(task: TaskData) {
    this.showSpinner();
    task.userId = this.userId;
    return this.http
      .post(`${Constant.TASK.ADD_TASK_URL}`, task)
      .pipe(
        tap(() => this.getTaskById(this.userId)),
        finalize(() => this.hideSpinner())
      )
      .subscribe({
        next: (res) => {
          alert('Task Added Successfully');
        },
        error: (err) => {
          alert(`${err.message}`);
        },
      });
    console.log(task);
  }

  updateTask(taskId: string, taskData: TaskData) {
    this.showSpinner();
    taskData.userId = this.userId;
    return this.http
      .put(`${Constant.TASK.UPDATE_TASK_URL}/${taskId}`, taskData)
      .pipe(
        tap(() => this.getTaskById(this.userId)),
        finalize(() => this.hideSpinner())
      )
      .subscribe({
        next: (res) => {
          alert('Task Updated Successfully');
        },
        error: (err) => {
          alert(`${err.message}`);
        },
      });
  }

  deleteTask(taskId: string) {
    return this.http
      .delete(`${Constant.TASK.DELETE_TASK_URL}/${taskId}`)
      .pipe(
        tap(() => this.getTaskById(this.userId)),
        finalize(() => this.hideSpinner())
      )
      .subscribe({
        next: (res) => {
          alert('Task Deleted Successfully');
        },
        error: (err) => {
          alert(`${err.message}`);
        },
      });
  }
}
