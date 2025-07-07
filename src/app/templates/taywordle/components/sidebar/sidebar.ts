import { Component, inject, input } from '@angular/core';
import { Themes } from '../../../../services/themes/themes';
import { MatDivider } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  imports: [MatDivider, CommonModule, MatButton],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  themesService = inject(Themes);
  sidebar = input<MatDrawer>();

  changeTheme(themeId: string): void {
    this.themesService.setTheme(themeId);
    this.sidebar()?.close();
  }
}
