import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, Role } from '../services/auth';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const user = auth.user();

  if (!user) {
    return router.createUrlTree(['/login']);
  }

  const allowedRoles = route.data['roles'] as Role[] | undefined;

  if (!allowedRoles || allowedRoles.includes(user.role)) {
    return true;
  }

  const destination =
    user.role === 'admin' ? '/admin' : '/user-dashboard';

  return router.createUrlTree([destination]);
};