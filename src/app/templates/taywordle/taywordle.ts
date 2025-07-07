import { Component, inject } from '@angular/core';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Timer } from '../../services/timer';
import { Status } from './components/status/status';

@Component({
  selector: 'app-taywordle',
  imports: [
    Sidebar,
    Header,
    MatDrawerContainer,
    MatDrawer,
    MatProgressBarModule,
    Status,
  ],
  templateUrl: './taywordle.html',
  styleUrl: './taywordle.scss',
})
export class Taywordle {
  timer = inject(Timer);
}
