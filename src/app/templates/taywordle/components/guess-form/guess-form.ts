import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DataControl } from '../../../../services/data-control/data-control';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, map, startWith } from 'rxjs';
import { Song } from '../../../../shared/model/data.model';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../../../../shared/dialog/dialog';
import { DialogType } from '../../../../shared/model/shared.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {  MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-guess-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIcon,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './guess-form.html',
})
export class GuessForm implements OnInit {
  private dataService = inject(DataControl);
  private dialog = inject(MatDialog);

  control = new FormControl('');
  allSongs = toSignal(this.dataService.getAllSongs());
  quote = toSignal(this.dataService.getRandomQuote());
  filteredSongs!: Observable<Song[]>;

  ngOnInit() {
    this.filteredSongs = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterSongs(value || ''))
    );
  }

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  private filterSongs(value: string): Song[] {
    const filterValue = this.normalizeValue(value);
    const songs = this.allSongs() ?? [];
    return songs.filter((song) =>
      this.normalizeValue(song.name).includes(filterValue)
    );
  }

  confirm() {
    if (
      this.control.value?.toLowerCase() === this.quote()?.song.toLowerCase()
    ) {
      this.openDialog(DialogType.SUCCESS);
    } else {
      this.openDialog(DialogType.FAIL);
    }
  }

  openDialog(type: DialogType) {
    this.dialog.open(Dialog, {
      width: '400px',
      data: {
        type,
        album: this.quote()?.album,
        song: this.quote()?.song,
      },
    });
  }
}
