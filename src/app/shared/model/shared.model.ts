import { Song } from './data.model';

export interface Theme {
  id: string;
  primary: string;
  displayName: string;
  icon: string;
}

export interface DialogData {
  type: DialogType;
  song: Song['name'];
  album: Song['album'];
}

export enum DialogType {
  SUCCESS = 'Sucess',
  FAIL = 'Fail',
}
