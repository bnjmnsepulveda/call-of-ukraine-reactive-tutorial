import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CityRankingStore, CityRankingState } from './city-ranking.store';

@Injectable({ providedIn: 'root' })
export class CityRankingQuery extends QueryEntity<CityRankingState> {

  constructor(protected override store: CityRankingStore) {
    super(store);
  }

}
