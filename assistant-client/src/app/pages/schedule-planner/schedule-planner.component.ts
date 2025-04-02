import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { TextScheduleComponent } from './text-schedule/text-schedule.component';
import { FormScheduleComponent } from './form-schedule/form-schedule.component';
import { ScheduleResponse } from '../../models/schedule.model';

@Component({
  selector: 'app-schedule-planner',
  imports: [NgIf,ScheduleListComponent,TextScheduleComponent,FormScheduleComponent],
  templateUrl: './schedule-planner.component.html',
  styleUrl: './schedule-planner.component.css',
})
export class SchedulePlannerComponent {
  isTextMode: boolean = true; // Toggle between input modes
  emittedSchedule!: ScheduleResponse; // Stores the emitted schedule

  toggleMode() {
    this.isTextMode = !this.isTextMode;
  }


  getEmittedSchedule(schedule: ScheduleResponse) {
    this.emittedSchedule = schedule;
    //console.log('Emitted Schedule:', this.emittedSchedule);
    
  }
}
