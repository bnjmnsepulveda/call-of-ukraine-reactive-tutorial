import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { RussianCity } from '../../domain/model/RussianCity';
import { getRussianCities } from '../../domain/service/getRussianCities';
import { RussianCityStateService } from '../../store/service/russian-city-state.service';
import { AttackRequestDTO } from '../dto/AttackRequestDTO';




@Injectable({
  providedIn: 'root'
})
export class GameService {

  private russianCities: RussianCity[] = getRussianCities()
  private subject$ = new Subject<RussianCity>();

  constructor(private russianCityState: RussianCityStateService) {
   
    
  }

  attackRussianCity(attack: AttackRequestDTO) {
    console.log('attack', attack.city)
    const index = this.russianCities.findIndex(rc => rc.id === attack.city.id)
    if (index && index !== -1) {
      const city = this.russianCities[index]
      console.log('city to destroy', city)
      const cityUpdated = {
        ...city,
        healthPoints: city.healthPoints - attack.weapon.attackPoints
      }
      this.russianCities[index] = cityUpdated
      this.subject$.next(this.russianCities[index])
    } else {
      console.log('cities', this.russianCities)
    }
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
