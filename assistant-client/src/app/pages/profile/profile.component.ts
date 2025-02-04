import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  auth = inject(AuthService);
  user: any;
  ngOnInit(): void {
    if (this.auth.isAuthenticated$) {
      this.auth.user$.subscribe((profile) => {
        console.log(profile);
        this.user=profile
      });
    }
  }
}
