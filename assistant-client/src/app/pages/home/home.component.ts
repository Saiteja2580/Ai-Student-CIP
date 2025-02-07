import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ToasterService } from '../../services/toaster.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, NgIf, SpinnerComponent, NgxSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  isLoading = false;
  router = inject(Router);
  spinnerService = inject(NgxSpinnerService);
  auth = inject(AuthService);
  toaster = inject(ToasterService);
  ngOnInit(): void {
    this.isLoading = true;
    this.spinnerService.show();
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/profile');
      }
      this.isLoading = false;
    });
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
}
