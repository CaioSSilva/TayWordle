import { Component, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DataControl } from '../../../../services/data-control/data-control';
import { ThemesService } from '../../../../services/themes/themes';
import { cleanDisplayName } from '../../../../shared/functions';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-quote',
  standalone: true,
  templateUrl: './quote.html',
})
export class Quote {
  themesService = inject(ThemesService);
  dataService = inject(DataControl);

  quote = toSignal(
    toObservable(this.themesService.currentTheme).pipe(
      switchMap(theme =>
        theme
          ? this.dataService.getRandomQuoteByAlbum(cleanDisplayName(theme.displayName))
          : this.dataService.getRandomQuote()
      )
    ), { initialValue: null }
  );
}
