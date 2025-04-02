import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ScheduleService } from '../../../services/schedule.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-text-schedule',
  imports: [FormsModule, CommonModule, SpinnerComponent],
  templateUrl: './text-schedule.component.html',
  styleUrl: './text-schedule.component.css',
})
export class TextScheduleComponent {
  scheduleText: string = '';

  scheduleService = inject(ScheduleService);


  validate() {
    if (this.scheduleText === '') {
      alert('Prompt should not be empty');
    } else {
      this.addScheduleText();
      this.scheduleText = '';
    }
  }

  addScheduleText() {
    this.scheduleService.addScheduleByText(this.scheduleText);
  }
}
