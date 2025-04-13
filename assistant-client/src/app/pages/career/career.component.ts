import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-career',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './career.component.html',
  styleUrl: './career.component.css',
})
export class CareerComponent {
  router = inject(Router);
  goToChat() {
    this.router.navigateByUrl('/career/chat');
  }
}
