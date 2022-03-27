import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { CityRanking } from '../../domain/model/CityRanking';

export interface CityRankingState extends EntityState<CityRanking> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'russian-city-damage' })
export class CityRankingStore extends EntityStore<CityRankingState> {

  constructor() {
    super();
  }

}
