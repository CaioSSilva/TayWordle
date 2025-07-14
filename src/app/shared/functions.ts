import { Album } from './model/data.model';

export function cleanDisplayName(name: string): string {
  return name.replace(/\s*\(Taylor's Version\)/, '');
}

export function transformDate(date: Album['releaseDate']): Date {
  return new Date(`${date[0]}/${date[1]}/${date[2]}`);
}
