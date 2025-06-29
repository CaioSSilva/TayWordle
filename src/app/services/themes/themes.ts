import { effect, Injectable, signal } from '@angular/core';
import { Theme } from '../../shared/model/shared.model';
import { themes } from './_themes';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  currentTheme = signal<Theme | null>(null);

  getThemes(): Theme[] {
    return themes;
  }

  setTheme(themeId: string | null): void {
    const theme = themes.find((t) => t.id === themeId);
    if (theme) {
      this.currentTheme.set(theme);
    }
  }

  updateThemeClass = effect(() => {
    const theme = this.currentTheme();
    document.body.classList.remove(...themes.map((t) => `${t.id}-theme`));

    if (theme) {
      document.body.classList.add(`${theme.id}-theme`);
    }
  });
}
