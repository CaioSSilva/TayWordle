import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DialogData, DialogType } from '../model/shared.model';
import { DataControl } from '../../services/data-control/data-control';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { transformDate } from '../functions';
import { MatIcon } from '@angular/material/icon';
import { Album } from '../model/data.model';
import { ThemesService } from '../../services/themes/themes';

@Component({
  selector: 'app-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatIcon,
    CommonModule,
  ],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
})
export class Dialog {
  themesService = inject(ThemesService);
  data: DialogData = inject(MAT_DIALOG_DATA);
  transformedData = computed(() => {
    return this.data.album === 'Evermore'
      ? { ...this.data, album: 'evermore' }
      : this.data;
  });
  dataControlService = inject(DataControl);
  album = toSignal(this.getAlbumData(this.transformedData().album));

  title() {
    return this.data.type === DialogType.SUCCESS
      ? 'Certa resposta! ✅'
      : 'Você errou! ❌';
  }

  subtitle() {
    return this.data.type === DialogType.SUCCESS
      ? 'Você é um verdadeiro Swiftie!'
      : 'Tente novamente!';
  }

  getAlbumData(album: string) {
    return this.dataControlService.getAlbumByName(album);
  }

  transformDate(date: Album['releaseDate']) {
    return transformDate(date);
  }

  reset() {
    location.reload();
  }
}
