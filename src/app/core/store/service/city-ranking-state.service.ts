import { Injectable } from '@angular/core';
import { Order } from '@datorama/akita';
import { CityRanking } from '../../domain/model/CityRanking';
import { CityRankingQuery } from '../city-ranking/city-ranking.query';
import { CityRankingStore } from '../city-ranking/city-ranking.store';

@Injectable({
  providedIn: 'root'
})
export class CityRankingStateService {

  constructor(private store: CityRankingStore, private query: CityRankingQuery) { }

  upsert(russianCityDamage: CityRanking) {
    this.store.upsert(russianCityDamage.id, russianCityDamage, (id, newState) => ({ id, ...newState }))
  }

  selectCityRanking(limitTo = 5) {
    return this.query.selectAll({ sortBy: 'destructionPercentage' , sortByOrder: Order.DESC, limitTo})
  }

}
