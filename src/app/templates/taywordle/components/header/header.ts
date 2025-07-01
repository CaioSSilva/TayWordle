import { Component, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Themes } from '../../../../services/themes/themes';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { Lightning } from '../../../../services/themes/lightning';
import { Content } from '../tutorial/content/content';
import { Tutorial } from '../tutorial/tutorial';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIcon, Tutorial, MatButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  themesService = inject(Themes);
  lightningService = inject(Lightning);
  sidebar = input<MatDrawer>();
  tutorial!: MatDialog;

  handleSidebar() {
    this.sidebar()?.toggle();
  }

  handleMode() {
    this.lightningService.toggleTheme();
  }

  openTutorial(dialog: MatDialog) {
    this.tutorial = dialog;
  }

  handleTutorial() {
    this.tutorial.open(Content, {
      height: `${window.innerHeight * 0.3}px`,
      width: `${window.innerWidth * 0.6}px`,
      maxWidth: `${window.innerHeight}px`,
      position: {
        top: '100px',
      },
    });
  }
}
