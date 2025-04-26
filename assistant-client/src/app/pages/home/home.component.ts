import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ToasterService } from '../../services/toaster.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe,
    NgIf,
    SpinnerComponent,
    NgxSpinnerModule,
    NgIf,
    NgClass,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  router = inject(Router);
  spinnerService = inject(NgxSpinnerService);
  auth = inject(AuthService);
  toaster = inject(ToasterService);

  isCollapsed = true;
  isLoading = false;

  isHidden: boolean = false;
  showScrollTop = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.checkScreenSize();
    this.isLoading = true;
    this.spinnerService.show();
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/profile');
      }
      this.isLoading = false;
    });

    window.addEventListener('scroll', () => {
      this.showScrollTop = window.scrollY > 300;
    });
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    if (window.innerWidth > 1000) {
      this.isCollapsed = false; // Show navbar on larger screens
    } else {
      this.isCollapsed = true; // Keep collapsed on smaller screens
    }
  }

  toggleCollapse() {
    if (this.isCollapsed) {
      // Expanding: Show navbar instantly before animation
      this.isHidden = false;
      setTimeout(() => {
        this.isCollapsed = false;
      }, 10);
    } else {
      // Collapsing: Animate first, then apply display: none
      this.isCollapsed = true;
      setTimeout(() => {
        this.isHidden = true; // Apply display: none after animation
      }, 400); // Match CSS transition duration (0.4s)
    }
  }
  onLogin() {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/profile');
      } else {
        this.auth.loginWithRedirect();
      }

      // this.router.navigateByUrl('/schedule');
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
