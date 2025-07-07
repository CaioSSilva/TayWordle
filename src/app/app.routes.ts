import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./templates/home/home').then((m) => m.Home),
  },
  {
    path: 'taywordle',
    loadComponent: () =>
      import('./templates/taywordle/taywordle').then((m) => m.Taywordle),
  },
];
