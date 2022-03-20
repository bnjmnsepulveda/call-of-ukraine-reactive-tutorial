import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { RussianCityState, RussianCityStore } from './russian-city.store';

@Injectable({ providedIn: 'root' })
export class RussianCityQuery extends QueryEntity<RussianCityState> {

  constructor(protected override store: RussianCityStore) { super(store); }

}
