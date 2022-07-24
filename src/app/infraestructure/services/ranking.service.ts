import { Injectable } from '@angular/core';
import { SoldierRankingStateService } from './soldier-ranking-state.service';
import { TargetRankingStateService } from './target-ranking-state.service';
import { Attack } from '../../core/domain/model/Attack';
import { calculateTargetRanking } from '../../core/application/calculateTargetRanking';
import { calculateSoldierRanking } from '../../core/application/calculateSoldierRanking';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(
    private soldierRankingState: SoldierRankingStateService,
    private targetRankingState: TargetRankingStateService
  ) { }

  calculateAndSaveTargetRanking(attack: Attack) {
      const currentRanking = this.targetRankingState.getByName(attack.russianTarget.name);
      const newRanking = calculateTargetRanking(attack, currentRanking)
      this.targetRankingState.upsert(newRanking)
  }

  calculateAndSaveSoldierRanking(attack: Attack) {
    const currentRanking = this.soldierRankingState.getById(attack.soldier.name);
    const newRanking = calculateSoldierRanking(attack, currentRanking)
    this.soldierRankingState.upsert(newRanking)
  }


  getSoldierRankingUpdate$() {
    return this.soldierRankingState.selectSoldierRanking()
  }

  getTargetRanking() {
    return this.targetRankingState.selectTargetRanking(5)
  }

}
