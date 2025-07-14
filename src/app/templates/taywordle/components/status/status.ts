import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Lifes } from '../../../../services/lifes';
import { CommonModule } from '@angular/common';
import { Themes } from '../../../../services/themes/themes';
import { CountdownComponent, CountdownModule } from 'ngx-countdown';
import { Timer } from '../../../../services/timer';

@Component({
  selector: 'app-status',
  imports: [MatCardModule, MatIcon, CommonModule, CountdownModule],
  templateUrl: './status.html',
  styleUrl: './status.scss',
})
export class Status implements AfterViewInit {
  lifesService = inject(Lifes);
  themesService = inject(Themes);
  timerService = inject(Timer);

  timer = viewChild<CountdownComponent>('countdown');

  lifes = computed(() => Array<number>(this.lifesService.lifes()));

  ngAfterViewInit() {
    this.timerService.setTimer(this.timer()!);
  }
}
