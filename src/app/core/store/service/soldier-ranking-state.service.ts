import { Injectable } from '@angular/core';
import { Order } from '@datorama/akita';
import { SoldierRanking } from '../../domain/model/SoldierRanking';
import { SoldierRankingQuery } from '../soldier-ranking/soldier-ranking.query';
import { SoldierRankingStore } from '../soldier-ranking/soldier-ranking.store';

@Injectable({
  providedIn: 'root'
})
export class SoldierRankingStateService {

  constructor(private store: SoldierRankingStore, private query: SoldierRankingQuery) { }

  getById(id: string) {
    return this.query.getEntity(id)
  }

  upsert(soldierRanking: SoldierRanking) {
    this.store.upsert(soldierRanking.soldiername, soldierRanking, (id, newState) => ({ id, ...newState }))
  }

  selectSoldierRanking(limitTo = 5) {
    return this.query.selectAll({ sortBy: 'points' , sortByOrder: Order.DESC, limitTo})
  }
  
  getAll() {
    return this.query.getAll()
  }
  
}
