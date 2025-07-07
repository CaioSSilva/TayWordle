import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Timer } from '../../../../services/timer';

@Component({
  selector: 'tutorial',
  styles: `
    .center {
      text-align: center;
    }
    `,
  template: `
    <h1 mat-dialog-title class="center">Tutorial 💡</h1>
    <mat-dialog-content class="mat-typography">
      <h2>Como jogar?</h2>

      <h3>Uma pequena parte de uma das letras de Taylor aparecerá na tela!</h3>

      <h3>
        Escreva qual música você acha que a letra pertence no campo de texto.
      </h3>

      <h3>Você terá 15 segundos e 3 tentativas para acertar!</h3>

      <h2>Escolha sua era favorita!</h2>

      <h3>
        Use o menu para selecionar sua era favorita e jogar apenas com músicas
        dessa era!
      </h3>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button matButton mat-dialog-close (click)="resume()">Fechar</button>
    </mat-dialog-actions>
  `,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
})
export class TutorialTaywordle {
  timer = inject(Timer);
  resume() {
    this.timer.resumeTimer();
  }
}

export const TutorialConfig = {
  height: `400px`,
  maxWidth: `90vw`,
  position: {
    top: '100px',
  },
};
