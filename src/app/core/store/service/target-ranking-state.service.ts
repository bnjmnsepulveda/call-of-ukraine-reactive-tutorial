import { Injectable } from '@angular/core';
import { Order } from '@datorama/akita';
import { TargetRanking } from '../../domain/model/TargetRanking';
import { TargetRankingQuery } from '../target-ranking/target-ranking.query';
import { TargetRankingStore } from '../target-ranking/target-ranking.store';

@Injectable({
  providedIn: 'root'
})
export class TargetRankingStateService {

  constructor(private store: TargetRankingStore, private query: TargetRankingQuery) { }

  upsert(ranking: TargetRanking) {
    this.store.upsert(ranking.id, ranking, (id, newState) => ({ id, ...newState }))
  }

  selectTargetRanking(limitTo = 5) {
    return this.query.selectAll({ sortBy: 'destructionPercentage' , sortByOrder: Order.DESC, limitTo})
  }

}
