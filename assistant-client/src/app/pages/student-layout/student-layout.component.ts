import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { NgxSpinnerComponent, NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-student-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './student-layout.component.html',
  styleUrl: './student-layout.component.css',
})
export class StudentLayoutComponent {
  auth = inject(AuthService);
  isCollapsed = false;
  router = inject(Router);
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  getSidebarClass() {
    return {
      collapsed: this.isCollapsed,
    };
  }
  rotateMenuBar() {
    return {
      rotate: this.isCollapsed,
    };
  }
  onLogout() {
    this.auth.logout();
    //this.router.navigateByUrl('/home');
  }
}
