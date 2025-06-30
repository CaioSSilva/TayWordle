import { Dialog } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, switchMap, startWith, map } from 'rxjs';
import { DataControl } from '../../services/data-control/data-control';
import { ThemesService } from '../../services/themes/themes';
import { cleanDisplayName } from '../../shared/functions';
import { Song } from '../../shared/model/data.model';
import { DialogType } from '../../shared/model/shared.model';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { Quote } from './components/quote/quote';
import { GuessForm } from './components/guess-form/guess-form';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-taywordle',
  imports: [
    MatProgressSpinnerModule,
    MatDrawerContainer,
    GuessForm,
    MatDrawer,
    Sidebar,
    Header,
    Quote,
],
  templateUrl: './taywordle.html',
  styleUrl: './taywordle.scss',
})
export class Taywordle {
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
