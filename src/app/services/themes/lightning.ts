import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Lightning {
  private renderer: Renderer2;
  private currentTheme: 'light' | 'dark' = 'light'; // Tema padrão

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.toggleTheme();
    } else {
      this.setColorScheme('light');
    }
  }

  toggleTheme(): void {
    if (this.currentTheme === 'light') {
      this.currentTheme = 'dark';
      localStorage.setItem('theme', 'dark');
      this.setColorScheme('dark');
    } else {
      this.currentTheme = 'light';
      localStorage.setItem('theme', 'light');
      this.setColorScheme('light');
    }
  }

  setColorScheme(scheme: 'light' | 'dark') {
    this.renderer.setStyle(document.body, 'color-scheme', scheme);
  }

  isDarkTheme(): boolean {
    return this.currentTheme === 'dark';
  }
}
