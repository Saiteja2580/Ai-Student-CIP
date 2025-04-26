import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-student-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './student-layout.component.html',
  styleUrl: './student-layout.component.css',
})
export class StudentLayoutComponent implements OnInit {
  toaster = inject(ToasterService);
  auth = inject(AuthService);

  isCollapsed = false;
  router = inject(Router);
  ngOnInit(): void {
    this.toaster.showSuccess('User Logged In Successfully', 'Success');
  }

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
