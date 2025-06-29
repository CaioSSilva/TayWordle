import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemesService } from '../../services/themes/themes';
import { MatDrawer } from '@angular/material/sidenav';
import { LightningService } from '../../services/lightning/lightining';
@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  themesService = inject(ThemesService);
  lightningService = inject(LightningService);
  sidebar = input<MatDrawer>();

  handleSidebar() {
    this.sidebar()?.toggle();
  }

  handleMode() {
    this.lightningService.toggleTheme();
  }
}
