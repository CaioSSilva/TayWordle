import { Component, inject, OnInit, output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Content } from './content/content';

@Component({
  selector: 'app-tutorial',
  imports: [],
  templateUrl: './tutorial.html',
  styleUrl: './tutorial.scss',
})
export class Tutorial implements OnInit {
  readonly tutorial = inject(MatDialog);
  dialog = output<MatDialog>();

  ngOnInit() {
    this.dialog.emit(this.tutorial);
    const show = window.localStorage.getItem('showTutorial');
    if (!show) {
      this.tutorial.open(Content, {
        height: `${window.innerHeight * 0.3}px`,
        width: `${window.innerWidth * 0.6}px`,
        maxWidth: `${window.innerHeight}px`,
        enterAnimationDuration: 2000,
        exitAnimationDuration: 1000,
        position: {
          top: '100px',
        },
      });
    }
    window.localStorage.setItem('showTutorial', 'false');
  }
}
