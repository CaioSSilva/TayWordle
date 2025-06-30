import { Component, inject } from '@angular/core';
import { ThemesService } from '../../../../services/themes/themes';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatDivider, MatButtonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  themesService = inject(ThemesService);

  setTheme(id: string) {
    this.themesService.setTheme(id);
  }
}
