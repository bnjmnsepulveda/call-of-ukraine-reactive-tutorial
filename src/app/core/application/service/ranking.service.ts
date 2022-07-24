import { Injectable } from '@angular/core';
import { Attack } from '../../domain/model/Attack';
import { SoldierRanking } from '../../domain/model/SoldierRanking';
import { TargetRanking } from '../../domain/model/TargetRanking';
import { calculateSoldierRanking } from '../../domain/service/calculateSoldierRanking';
import { calculateTargetRanking } from '../../domain/service/calculateTargetRanking';
import { SoldierRankingStateService } from '../../store/service/soldier-ranking-state.service';
import { TargetRankingStateService } from '../../store/service/target-ranking-state.service';

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
