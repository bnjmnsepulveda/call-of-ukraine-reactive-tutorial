import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { getWeapons } from '../../domain/service/getWeapons';

@Injectable({
  providedIn: 'root'
})
export class WeaponStateService {

  constructor() { }

  selectAll() {
    return of(getWeapons())
  }

}
