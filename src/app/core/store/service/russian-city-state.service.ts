import { Injectable } from '@angular/core';
import { RussianCity } from '../../domain/model/RussianCity';
import { RussianCityQuery } from '../russian-city/russian-city.query';
import { RussianCityStore } from '../russian-city/russian-city.store';

@Injectable({
  providedIn: 'root'
})
export class RussianCityStateService {

  constructor(
    private query: RussianCityQuery,
    private store: RussianCityStore
  ) { }

  save(russianCity: RussianCity) {
    this.store.update(russianCity.id, russianCity)
  }

  saveAll(entities: RussianCity[]) {
    this.store.set(entities)
  }

  selectAll() {
    return this.query.selectAll()
  }
}
