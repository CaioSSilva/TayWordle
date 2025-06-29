import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../../shared/dialog/dialog';
import { Header } from '../../shared/header/header';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ThemesService } from '../../services/themes/themes';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { DataControl } from '../../services/data-control/data-control';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith, switchMap } from 'rxjs';
import { Song } from '../../shared/model/data.model';
import { MatIcon } from '@angular/material/icon';
import { cleanDisplayName } from '../../shared/functions';
import { DialogType } from '../../shared/model/shared.model';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatSidenavModule,
    MatProgressSpinner,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CommonModule,
    MatDivider,
    MatIcon,
    Header,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  themesService = inject(ThemesService);
  dataService = inject(DataControl);
  dialog = inject(MatDialog);

  readonly theme$ = toObservable(this.themesService.currentTheme);
  readonly modalClosed = this.dialog.afterAllClosed;
  control = new FormControl('');

  filteredSongs: Observable<Song[]> | undefined;
  quote = toSignal(
    this.theme$.pipe(
      switchMap((theme) =>
        theme
          ? this.dataService.getRandomQuoteByAlbum(
              cleanDisplayName(theme.displayName)
            )
          : this.dataService.getRandomQuote()
      )
    ),
    { initialValue: null }
  );
  allSongs = toSignal(this.dataService.getAllSongs());

  [x: string]: any;

  ngOnInit() {
    this.filteredSongs = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterSongs(value || ''))
    );
  }

  private filterSongs(value: string): Song[] {
    const filterValue = this.normalizeValue(value);
    const allSongs = this.allSongs() ?? [];
    return allSongs.filter((song) =>
      this.normalizeValue(song.name).includes(filterValue)
    );
  }

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  confirm() {
    if (
      this.control.value?.toLowerCase() === this.quote()?.song.toLowerCase()
    ) {
      this.success();
    } else {
      this.fail();
    }
  }

  success() {
    this.openDialog(DialogType.SUCCESS);
  }

  fail() {
    this.openDialog(DialogType.FAIL);
  }

  openDialog(type: DialogType): void {
    this.dialog.open(Dialog, {
      width: '400px',
      data: {
        type: type,
        album: this.quote()?.album,
        song: this.quote()?.song,
      },
    });
  }
}
