import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, startWith, map, switchMap } from 'rxjs';
import { Song } from '../../../../shared/model/data.model';
import { Themes } from '../../../../services/themes/themes';
import { Data } from '../../../../services/data';
import { cleanDisplayName } from '../../../../shared/functions';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Timer } from '../../../../services/timer';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Dialog } from '../../../../services/dialog';
import { Lifes } from '../../../../services/lifes';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  control = new FormControl('');
  themesService = inject(Themes);
  timerService = inject(Timer);
  dialogService = inject(Dialog);
  lifesService = inject(Lifes);
  dataService = inject(Data);
  readonly theme$ = toObservable(this.themesService.currentTheme);
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
  isRunning = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (this.theme$ && this.quote()) {
        this.timerService.setTime(0);
        this.isRunning.set(false);
      }
    });
  }

  start() {
    this.isRunning.set(true);

    if (
      this.theme$ &&
      this.quote() &&
      this.allSongs() &&
      !this.dialogService.isOpen('taywordle-tutorial')
    ) {
      setTimeout(() => {
        console.log('Starting timer');
        this.timerService.restartTimer();
        this.timerService.setTime(25);
        this.timerService.begginTimer();
      }, 0);
    }
  }

  ngOnInit() {
    this.filteredSongs = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterSongs(value || ''))
    );
  }
  filterSongs(value: string): Song[] {
    const filterValue = this.normalizeValue(value);
    const allSongs = this.allSongs() ?? [];
    return allSongs.filter((song) =>
      this.normalizeValue(song.name).includes(filterValue)
    );
  }
  normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  getQuote() {
    return;
  }

  confirm() {
    const win =
      this.control.value?.toLowerCase() === this.quote()?.song.toLowerCase();
    if (!win && this.lifesService.lifes() > 0) {
      this.control.setValue('');
      this.lifesService.decreaseLife();

      if (this.lifesService.lifes() === 0) {
        this.fail();
      }
    } else {
      this.success();
    }
  }

  success() {
    console.log('You win!');
  }

  fail() {
    this.isRunning.set(false);
    this.lifesService.resetLifes();
    this.timerService.restartTimer();
    this.timerService.setTime(0);
  }
}
