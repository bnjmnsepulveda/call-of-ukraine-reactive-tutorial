import { Injectable } from '@angular/core';
import { of, map } from 'rxjs';
import { getRandomItem } from '../../lib/RandomHelper';
import { nanoid } from 'nanoid'

@Injectable({
  providedIn: 'root'
})
export class ReactiveService {

  constructor() { }

  static getRandomUsername() {
    const usernames = ['zelensky', 'obama', 'goku', 'juan', 'pepe', 'marcus']
    return of(getRandomItem(usernames)).pipe(
      map(u => `${u}-${nanoid(6)}`)
    )
  }
}
