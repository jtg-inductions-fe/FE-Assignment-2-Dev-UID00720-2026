import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userEmail = localStorage.getItem('email');

  if (userEmail) {
    return true;
  } else {
    return router.createUrlTree(['/']);
  }
};
