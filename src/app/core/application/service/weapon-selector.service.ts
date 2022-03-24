import { Injectable } from '@angular/core';
import { map, interval, switchMap } from 'rxjs';
import { Weapon } from '../../domain/model/Weapon';
import { getRandomItem } from '../../lib/RandomHelper';
import { WeaponStateService } from '../../store/service/weapon-state.service';

@Injectable({
  providedIn: 'root'
})
export class WeaponSelectorService {

  constructor(private weaponState: WeaponStateService) { }

  getRandomWeapon() {
    return interval(80).pipe(
      switchMap(n => this.weaponState.selectAll()),
      map(weapons => getRandomItem<Weapon>(weapons))
    )
  }

}
