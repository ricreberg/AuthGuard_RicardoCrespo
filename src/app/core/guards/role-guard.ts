import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, Role } from '../services/auth';

export const roleGuard = (allowedRole: Role): CanActivateFn => {
  return () => {
    const auth = inject(Auth);
    const router = inject(Router);
    const user = auth.user();

    if (!user) {
      return router.createUrlTree(['/login']);
    }

    if (user.role === allowedRole) {
      return true;
    }

    const destination =
      user.role === 'admin' ? '/admin' : '/user-dashboard';

    return router.createUrlTree([destination]);
  };
};