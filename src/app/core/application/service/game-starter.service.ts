import { Injectable } from '@angular/core';
import { getRussianCities } from '../../domain/service/getRussianCities';
import { RussianCityStateService } from '../../store/service/russian-city-state.service';

@Injectable({
  providedIn: 'root'
})
export class GameStarterService {

  constructor(private russianCityState: RussianCityStateService) { }

  loadRussianCountries() {
    this.russianCityState.saveAll(getRussianCities())
  }

}
