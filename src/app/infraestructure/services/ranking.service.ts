import { Injectable } from '@angular/core';
import { SoldierRankingStateService } from './soldier-ranking-state.service';
import { Attack } from '../../core/domain/model/Attack';
import { calculateSoldierRanking } from '../../core/application/calculateSoldierRanking';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(
    private soldierRankingState: SoldierRankingStateService
  ) { }

  calculateAndSaveSoldierRanking(attack: Attack) {
    const currentRanking = this.soldierRankingState.getById(attack.soldier.name);
    const newRanking = calculateSoldierRanking(attack, currentRanking)
    this.soldierRankingState.upsert(newRanking)
  }

  getTop10SoldierRanking() {
    return this.soldierRankingState.selectSoldierRanking(10)
  }

}
