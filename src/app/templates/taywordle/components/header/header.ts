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
  sidebar = input<MatDrawer>();

  ngAfterViewInit(): void {
    //this.openTutorial();
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
