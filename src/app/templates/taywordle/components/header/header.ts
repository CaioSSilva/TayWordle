import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  OnInit,
  viewChild,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Themes } from '../../../../services/themes/themes';
import { MatDrawer } from '@angular/material/sidenav';
import { Lightning } from '../../../../services/themes/lightning';
import { MatButton } from '@angular/material/button';
import { Dialog } from '../../../../services/dialog';
import {
  TutorialTaywordle,
  TutorialConfig,
} from '../dialogs/tutorial-taywordle';
import { Timer } from '../../../../services/timer';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIcon, MatButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements AfterViewInit {
  themesService = inject(Themes);
  lightningService = inject(Lightning);
  dialogService = inject(Dialog);
  timerService = inject(Timer);
  sidebar = input<MatDrawer>();

  ngAfterViewInit(): void {
    this.timerService.pauseTimer();
    this.checkTutorial();
  }

  checkTutorial() {
    const show = window.localStorage.getItem('showTutorial');
    if (!show) {
      this.openTutorial();
    }
    window.localStorage.setItem('showTutorial', 'false');
  }

  handleSidebar() {
    this.sidebar()?.toggle();
  }

  handleMode() {
    this.lightningService.toggleTheme();
  }

  openTutorial() {
    this.dialogService.openDialog(TutorialTaywordle, TutorialConfig);
  }
}
