import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-renderquiz',
  imports: [],
  templateUrl: './renderquiz.component.html',
  styleUrl: './renderquiz.component.css',
})
export class RenderquizComponent {
  router = inject(Router);
  gototDash() {
    this.router.navigateByUrl('/quizmodule/dashboard');
  }
}
