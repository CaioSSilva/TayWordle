import { Component, inject, input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemesService } from '../../services/themes/themes';
import { MatDrawer } from '@angular/material/sidenav';
import { LightningService } from '../../services/lightning/lightining';
import { Tutorial } from '../../components/tutorial/tutorial';
import { MatDialog } from '@angular/material/dialog';
import { Content } from '../../components/tutorial/content/content';
@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    Tutorial,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  themesService = inject(ThemesService);
  lightningService = inject(LightningService);
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
