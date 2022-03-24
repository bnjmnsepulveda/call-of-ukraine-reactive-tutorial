import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RussianCity } from '../../domain/model/RussianCity';
import { RussianCityStateService } from '../../store/service/russian-city-state.service';

@Injectable({
  providedIn: 'root'
})
export class RussianCityService {

  constructor(private state: RussianCityStateService) { }

  getInputSelectData(): Observable<Pick<RussianCity, 'id' | 'name'>[]> {
    return this.state.selectAll()
  }

  setRussianCities(russianCities: RussianCity[]) {
    this.state.saveAll(russianCities)
  }
  
}
