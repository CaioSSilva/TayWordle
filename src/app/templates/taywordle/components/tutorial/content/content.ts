import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-content',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './content.html',
  styleUrl: './content.scss',
})
export class Content {}
