import { Injectable, signal } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';

@Injectable({
  providedIn: 'root',
})
export class Timer {
  public count: CountdownComponent | null = null;
  time = signal<number>(0);
  stopOn = signal<number>(0);
  onDemand = signal<boolean>(true);
  format = signal<string>('mm:ss');

  config = {
    format: this.format(),
    demand: this.onDemand(),
    stopTime: this.stopOn(),
  };

  setTimer(timer: CountdownComponent): void {
    this.count = timer;

    if (this.count) {
      this.count.config = this.config;
    }
  }

  setTime(seconds: number): void {
    if (this.count) {
      this.count.config.leftTime = seconds;
      this.count.restart();
    }
  }

  begginTimer(): void {
    if (this.count) {
      this.count.begin();
    }
  }

  restartTimer(): void {
    if (this.count) {
      this.count.restart();
    }
  }
}
