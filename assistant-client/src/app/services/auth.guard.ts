import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    tap((isAuthenticated: any) => {
      if (!isAuthenticated) {
        console.log(isAuthenticated);

        router.navigate(['/home']); // Redirect to login page
      }
    }),
    map((isAuthenticated) => isAuthenticated) // Ensure boolean return
  );
};
