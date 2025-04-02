import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Schedule, type NewSchedule } from '../models/schedule.model';
import { Constant } from '../constants/Constant';
import { finalize, tap } from 'rxjs';
import { ScheduleResponse } from '../models/schedule.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  userId!: string;
  authService = inject(AuthService);
  http = inject(HttpClient);

  // ✅ Signal to store schedule list
  private schedules = signal<ScheduleResponse[]>([]);
  isloading = signal<boolean>(false);
  spinnerService = inject(NgxSpinnerService);

  constructor() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.userId = user.sub!;
        this.getScheduleById(this.userId); // Fetch schedules when user logs in
      }
    });
  }

  // ✅ Getter for loading state
  get loading$() {
    return this.isloading;
  }

  // ✅ Getter to access the schedules signal
  get schedules$() {
    return this.schedules;
  }

  private showSpinner() {
    this.isloading.set(true);
    this.spinnerService.show();
  }

  private hideSpinner() {
    this.isloading.set(false);
    this.spinnerService.hide();
  }

  // ✅ Fetch and update the signal
  getScheduleById(userId: string) {
    this.showSpinner();
    this.isloading.set(true);

    this.http
      .get(`${Constant.SCHEDULE.GET_SCHEDULE_URL}/${userId}`)
      .pipe(
        tap((res) => this.schedules.set(res as ScheduleResponse[])),
        finalize(() => this.hideSpinner())
      ) // Update signal
      .subscribe({ error: (err) => alert(err.message) });
  }

  // ✅ Add new schedule (via text) and update signal
  addScheduleByText(prompt: string) {
    this.showSpinner();
    return this.http
      .post(`${Constant.SCHEDULE.ADD_SCHEDULE_TEXT_URL}`, {
        prompt,
        userId: this.userId,
      })
      .pipe(
        tap(() => this.getScheduleById(this.userId)),
        finalize(() => this.hideSpinner())
      ) // Refresh after adding
      .subscribe({
        next: (res) => alert('Schedule Created Successfully'),
        error: (err) => alert(err.message),
      });
  }

  // ✅ Add new schedule (via form) and update signal
  addScheduleByForm(schedule: Schedule) {
    this.showSpinner();
    return this.http
      .post(`${Constant.SCHEDULE.ADD_SCHEDULE_FORM_URL}`, schedule)
      .pipe(
        tap(() => this.getScheduleById(this.userId)),
        finalize(() => this.hideSpinner())
      ) // Refresh after adding
      .subscribe({
        next: (res) => alert('Schedule Created Successfully'),
        error: (err) => alert(err.message),
      });
  }

  // ✅ Update schedule and refresh signal
  updateSchedule(schedule: NewSchedule, id: string) {
    this.showSpinner();
    return this.http
      .patch(`${Constant.SCHEDULE.UPDATE_SCHEDULE_URL}/${id}`, schedule)
      .pipe(
        tap(() => this.getScheduleById(this.userId)),
        finalize(() => this.hideSpinner())
      ) // Refresh after updating
      .subscribe({
        next: (res) => alert('Schedule Updated Successfully'),
        error: (err) => alert(err.message),
      });
  }

  // ✅ Delete schedule and refresh signal
  deleteSchedule(scheduleId: string) {
    this.showSpinner();
    return this.http
      .delete(`${Constant.SCHEDULE.DELETE_SCHEDULE_URL}/${scheduleId}`)
      .pipe(
        tap(() => this.getScheduleById(this.userId)),
        finalize(() => this.hideSpinner())
      ) // Refresh after deleting
      .subscribe({
        next: (res) => alert('Schedule Deleted Successfully'),
        error: (err) => alert(err.message),
      });
  }
}
