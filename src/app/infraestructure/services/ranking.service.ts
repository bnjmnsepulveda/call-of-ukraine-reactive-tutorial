import { Injectable } from '@angular/core';
import { Attack } from '../../core/domain/model/Attack';
import { calculateSoldierRanking } from '../../core/application/calculateSoldierRanking';
import { SoldierRankingStore } from '../store/soldier-ranking.store';
import { SoldierRankingQuery } from '../store/soldier-ranking.query';
import { Order } from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(
    private store: SoldierRankingStore, 
    private query: SoldierRankingQuery
  ) { }

  calculateAndSaveSoldierRanking(attack: Attack) {
    const currentRanking = this.query.getEntity(attack.soldier.name) 
    const newRanking = calculateSoldierRanking(attack, currentRanking)
    this.store.upsert(newRanking.soldiername, newRanking, (id, newState) => ({ id, ...newState }))
  }

  getTop10SoldierRanking() {
    return this.query.selectAll({ 
      sortBy: 'points' , 
      sortByOrder: Order.DESC, 
      limitTo: 10
    })
  }

}
