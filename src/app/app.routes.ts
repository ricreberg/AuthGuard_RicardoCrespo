import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin/admin.page').then((m) => m.AdminPage),
    canActivate: [authGuard, roleGuard('admin')],
  },
  {
    path: 'user-dashboard',
    loadComponent: () =>
      import('./pages/user-dashboard/user-dashboard.page').then(
        (m) => m.UserDashboardPage
      ),
    canActivate: [authGuard, roleGuard('user')],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];