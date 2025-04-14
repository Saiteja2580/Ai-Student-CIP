import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Constant } from '../constants/Constant';
import { marked } from 'marked';

@Injectable({
  providedIn: 'root',
})
export class CareerService {
  authService = inject(AuthService);
  userId: any;
  constructor() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.userId = user.sub;
      }
    });
  }

  http = inject(HttpClient);

  getChatResponse(question: string) {
    console.log(question);
    console.log('user Id', this.userId);

    return this.http.post(
      `${Constant.CAREER.GET_QUESTION_RESPONSE_URL}/${this.userId}`,
      { question }
    );
  }

  getChatHistory() {
    return this.http.get(
      `${Constant.CAREER.GET_CHAT_HISTORY_URL}/${this.userId}`
    );
  }
}
