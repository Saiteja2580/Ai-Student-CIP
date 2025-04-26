import { Component, inject, Input } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import {
  Schedule,
  ScheduleResponse,
  type NewSchedule,
} from '../../../models/schedule.model';
import { ScheduleService } from '../../../services/schedule.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-schedule',
  imports: [FormsModule, CommonModule, SpinnerComponent],
  templateUrl: './form-schedule.component.html',
  styleUrl: './form-schedule.component.css',
})
export class FormScheduleComponent {
  isEditMode = false;

  @Input({ required: true }) editSchedule!: ScheduleResponse;

  spinnerService = inject(NgxSpinnerService);
  scheduleService = inject(ScheduleService);

  newSchedule: NewSchedule = {
    name: '',
    date: '',
    time: '',
    endTime: '',
    category: '',
    location: '',
    priority: '',
  };

  ngOnChanges() {
    if (this.editSchedule) {
      this.isEditMode = true;
      this.newSchedule.name = this.editSchedule.name;
      this.newSchedule.date = this.editSchedule.date;
      this.newSchedule.time = this.editSchedule.time;
      this.newSchedule.endTime = this.editSchedule.endTime;
      this.newSchedule.category = this.editSchedule.category;
      this.newSchedule.location = this.editSchedule.location;
      this.newSchedule.priority = this.editSchedule.priority;
    } else {
      this.isEditMode = false;
      this.resetForm();
    }
  }

  resetForm() {
    this.newSchedule = {
      name: '',
      date: '',
      time: '',
      endTime: '',
      category: '',
      location: '',
      priority: '',
    };
  }

  get validate() {
    return Object.values(this.newSchedule).every(
      (value) => value.trim() !== ''
    );
  }

  validateSchedule() {
    if (this.validate) {
      this.addSchedule();
      this.resetForm();
    } else {
      alert('Enter all fields to set schedule');
    }
  }

  addSchedule() {
    const schedule: Schedule = {
      ...this.newSchedule,
      userId: this.scheduleService.userId,
    };
    this.scheduleService.addScheduleByForm(schedule);
  }

  updateSchedule() {
    this.scheduleService.updateSchedule(
      this.newSchedule,
      this.editSchedule._id
    );
    this.resetForm();
  }
}
