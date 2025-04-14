import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CareerService } from '../../../services/career.service';
import { marked } from 'marked';

interface ChatMessage {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-aichat',
  templateUrl: './aichat.component.html',
  styleUrls: ['./aichat.component.css'],
  imports: [FormsModule, NgIf, NgFor],
  standalone: true,
})
export class AichatComponent {
  message = '';
  question = '';
  messages: ChatMessage[] = [];
  isTyping = false;
  careerService = inject(CareerService);

  constructor() {
    // Add initial bot message
    this.messages.push({
      content: "Hello! I'm your Career AI Assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    });
  }

  async sendMessage() {
    if (!this.message.trim()) return;

    // Add user message
    this.messages.push({
      content: this.message,
      isUser: true,
      timestamp: new Date(),
    });

    this.isTyping = true;
    this.question = this.message;
    this.message = '';
    this.careerService
      .getChatResponse(this.question)
      .subscribe(async (response: any) => {
        let markedresponse = await marked.parse(response.response);

        this.messages.push({
          content: markedresponse,
          isUser: false,
          timestamp: new Date(),
        });
        this.isTyping = false;
      });
  }
}
