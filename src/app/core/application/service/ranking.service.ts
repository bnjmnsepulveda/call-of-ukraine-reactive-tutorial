import { Injectable } from '@angular/core';
import { SoldierRanking } from '../../domain/model/SoldierRanking';
import { TargetRanking } from '../../domain/model/TargetRanking';
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

  saveSoldierRanking(ranking: SoldierRanking) {

    const oldRanking: SoldierRanking = this.soldierRankingState.getById(ranking.soldiername)
    if (!oldRanking) {
      this.soldierRankingState.upsert(ranking)
      return
    }
    const oldStatistics = oldRanking.statistics 
    const statistics = ranking.statistics
    
    const newRanking: SoldierRanking = {
      points: oldRanking.points + ranking.points,
     // russianCitiesAttacked: [...new Set( ...oldRanking.russianCitiesAttacked, ...ranking.russianCitiesAttacked )],
      soldiername: ranking.soldiername,
      statistics: {
        civilians: oldStatistics.civilians + statistics.civilians,
        buildings: oldStatistics.buildings + statistics.buildings,
        soldiers: oldStatistics.soldiers + statistics.soldiers,
        tanks: oldStatistics.tanks+ statistics.tanks,
        trucks: oldStatistics.trucks + statistics.trucks,
        warplanes: oldStatistics.warplanes + statistics.warplanes,
        warships: oldStatistics.warships + statistics.warships,
      }
    }
    this.soldierRankingState.upsert(newRanking)
  }

  saveTargetRanking(ranking: TargetRanking) {
    this.targetRankingState.upsert(ranking)
  }

  getSoldierRankingUpdate$() {
    return this.soldierRankingState.selectSoldierRanking()
  }

  getTargetRanking() {
    return this.targetRankingState.selectTargetRanking(5)
  }
  
}
