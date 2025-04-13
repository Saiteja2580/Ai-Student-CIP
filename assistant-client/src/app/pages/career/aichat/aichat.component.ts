import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-aichat',
  templateUrl: './aichat.component.html',
  styleUrls: ['./aichat.component.css'],
  imports: [NgClass, FormsModule],
})
export class AichatComponent {
  message = '';
  sendMessage() {
    console.log(this.message);
  }
}
