import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { GameAPI } from '../../api/game.api';
import { RussianCity } from '../../domain/model/RussianCity';
import { createAttack } from '../../domain/service/createAttack';
import { getRussianCities } from '../../domain/service/getRussianCities';
import { RussianCityStateService } from '../../store/service/russian-city-state.service';
import { AttackRequestDTO } from '../dto/AttackRequestDTO';




@Injectable({
  providedIn: 'root'
})
export class GameService {

  private russianCities: RussianCity[] = getRussianCities()
  private subject$ = new Subject<RussianCity>();

  constructor(
    private russianCityState: RussianCityStateService,
    private gameApi: GameAPI
  ) { }

  attackRussianCity(attack: AttackRequestDTO) {
    console.log('attack', attack.city)
    this.gameApi.saveAttack(createAttack(attack))

  }

  loadRussianCities() {
    return this.russianCityState.saveAll(this.russianCities)
  }

  russianCitiesStatusSubcription$() {
    return this.subject$.asObservable().pipe(
      tap(russianCityUpdate => this.russianCityState.save(russianCityUpdate))
    )
  }
  
}
