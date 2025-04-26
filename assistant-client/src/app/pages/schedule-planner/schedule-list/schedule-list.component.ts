import { Component, inject, output } from '@angular/core';
import { ScheduleService } from '../../../services/schedule.service';
import { AuthService } from '@auth0/auth0-angular';
import { ScheduleResponse } from '../../../models/schedule.model';

@Component({
  selector: 'app-schedule-list',
  imports: [],
  templateUrl: './schedule-list.component.html',
  styleUrl: './schedule-list.component.css',
})
export class ScheduleListComponent {
  authService = inject(AuthService);
  scheduleService = inject(ScheduleService);

  scheduleList: any = [];
  scheduleEmitter = output<ScheduleResponse>();

  userId!: string;

  constructor() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.userId = user.sub!;
      }
    });
  }

  onUpdate(schedule: ScheduleResponse) {
    this.scheduleEmitter.emit(schedule);
  }

  onDelete(scheduleId: string) {
    this.scheduleService.deleteSchedule(scheduleId);
  }
}
