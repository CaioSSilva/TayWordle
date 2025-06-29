export interface Album {
  title: string;
  albumCover: string;
  releaseDate: Array<[string, number, number]>;
}

export interface Quote {
  quote: string;
  song: string;
  album: string;
}

export interface Song {
  name: string;
  artist: string;
  lyrics: string;
  duration: string;
  album: string;
}
