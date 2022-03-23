import { Injectable } from '@angular/core';
import { delay, filter, from, groupBy, iif, map, mergeMap, Observable, of, reduce, scan, Subject, switchMap, tap, toArray, zip } from 'rxjs';
import { GameAPI } from '../../api/game.api';
import { Attack } from '../../domain/model/Attack';
import { RussianCity } from '../../domain/model/RussianCity';
import { getRussianCities } from '../../domain/service/getRussianCities';
import { RussianCityStateService } from '../../store/service/russian-city-state.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private russianCities: RussianCity[] = getRussianCities()
  private realtimeAttacks$: Observable<Attack> = null

  constructor(
    private russianCityState: RussianCityStateService,
    private gameApi: GameAPI
  ) { 
    this.realtimeAttacks$ = this.gameApi.getRealtimeAttacks().pipe(
      filter(a => a.soldier !== null)
    )
  }

  loadRussianCities() {
    return this.russianCityState.saveAll(this.russianCities)
  }
  
  getRankingSoldiers(suscription: (item: any) => void) {
    return this.realtimeAttacks$.pipe(
      map(a => ({
        soldierName: a.soldier.name,
        points: a.soldier.gamePoints,
        city: a.city.name,
        attack: a.weapon.attackPoints
      })),     
      scan((acc, value) => [...acc, value], []), // accumulate attacks  
      switchMap(attacks => from(attacks).pipe(
        groupBy(a => a.soldierName),
        mergeMap(group => zip(of(group.key), group.pipe(toArray())))
      ))

    ).subscribe(suscription)
  }
}
