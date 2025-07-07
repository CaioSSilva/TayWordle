import { ElementRef, Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Timer {
  private intervalId: any = null;
  private seconds = signal(0);
  private timerElement: any = null;
  private isPaused = signal(false);

  initTimer(timer: ElementRef, time: number) {
    this.timerElement = timer.nativeElement;
    this.seconds.set(time);
    this.isPaused.set(false);

    const formatTime = (secs: number) => {
      const mins = Math.floor(secs / 60);
      const secsLeft = secs % 60;
      return `${mins.toString().padStart(2, '0')}:${secsLeft
        .toString()
        .padStart(2, '0')}`;
    };

    this.timerElement.innerHTML = `${formatTime(this.seconds())}`;

    this.intervalId = setInterval(() => {
      if (!this.isPaused()) {
        if (this.seconds() <= 0) {
          clearInterval(this.intervalId);
          this.timerElement.innerHTML = '00:00';
          this.timerElement.style.color = 'red';
        } else {
          this.timerElement.innerHTML = `${formatTime(this.seconds())}`;
          this.seconds.set(this.seconds() - 1);
        }
      }
    }, 1000);
  }

  pauseTimer() {
    this.isPaused.set(true);
  }

  resumeTimer() {
    this.isPaused.set(false);
  }
}
