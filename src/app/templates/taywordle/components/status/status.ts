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
import { Timer } from '../../../../services/timer';

@Component({
  selector: 'app-status',
  imports: [MatCardModule, MatIcon, CommonModule],
  templateUrl: './status.html',
  styleUrl: './status.scss',
})
export class Status implements AfterViewInit {
  lifesService = inject(Lifes);
  themesService = inject(Themes);
  timerService = inject(Timer);

  timer = viewChild<ElementRef>('timer');

  ngAfterViewInit(): void {
    this.timerService.initTimer(this.timer()!, 15);
  }

  lifes = computed(() => Array<number>(this.lifesService.lifes()));
}
