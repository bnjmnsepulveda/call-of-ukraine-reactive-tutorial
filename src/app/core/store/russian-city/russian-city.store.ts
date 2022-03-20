import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { RussianCity } from '../../domain/model/RussianCity';
import { getRussianCities } from '../../domain/service/getRussianCities';

export interface RussianCityState extends EntityState<RussianCity, string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'russian-city' })
export class RussianCityStore extends EntityStore<RussianCityState> {
  
  constructor() { super(getRussianCities()) ; }

  
}
