import { inject, Injectable } from '@angular/core';
import { Album, Quote, Song } from '../../shared/model/data.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataControl {
  http = inject(HttpClient);

  private baseUrl: string = 'https://taylor-swift-api.vercel.app/api/';

  getAlbuns(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.baseUrl}albums`);
  }

  getAllSongs() {
    return this.http.get<Song[]>(`${this.baseUrl}songs`);
  }

  getAllSongsByAlbum(album: string) {
    return this.http.get<Song[]>(`${this.baseUrl}songs`);
  }

  getAlbumByName(album: string): Observable<Album> {
    return this.http.get<Album>(`${this.baseUrl}albums/${album}`);
  }

  getRandomQuote(): Observable<Quote> {
    return this.http.get<Quote>(`${this.baseUrl}quotes`);
  }

  getRandomQuoteByAlbum(album: string) {
    return this.http.get<Quote>(`${this.baseUrl}quotes/?album=${album}`);
  }
}
