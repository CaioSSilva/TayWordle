import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Lifes {
  lifes = signal(3);

  decreaseLife(): void {
    if (this.lifes() > 0) {
      this.lifes.update((value) => value - 1);
    }
  }

  resetLifes(): void {
    this.lifes.set(3);
  }
}
