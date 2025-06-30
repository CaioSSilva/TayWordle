import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'taywordle',
    pathMatch: 'full',
  },
  {
    path: 'taywordle',
    loadComponent: () =>
      import('./templates/taywordle/taywordle').then((m) => m.Taywordle),
  },
];
