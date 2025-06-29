import { Component, inject, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemesService } from '../../services/themes/themes';
@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  themesService = inject(ThemesService);

  toggleSidebar = output();

  handleSidebar() {
    this.toggleSidebar.emit();
  }
}
