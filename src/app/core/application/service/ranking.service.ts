import { Injectable } from '@angular/core';
import { CityRanking } from '../../domain/model/CityRanking';
import { SoldierRanking } from '../../domain/model/SoldierRanking';
import { TargetRanking } from '../../domain/model/TargetRanking';
import { CityRankingStateService } from '../../store/service/city-ranking-state.service';
import { SoldierRankingStateService } from '../../store/service/soldier-ranking-state.service';
import { TargetRankingStateService } from '../../store/service/target-ranking-state.service';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(
    private soldierRankingState: SoldierRankingStateService, 
    private cityRankingState: CityRankingStateService,
    private targetRankingState: TargetRankingStateService
  ) { }

  saveSoldierRanking(ranking: SoldierRanking) {
    this.soldierRankingState.upsert(ranking)
  }

  saveRussianTargetRanking(ranking: TargetRanking) {
    this.targetRankingState.upsert(ranking)
  }

  saveRussianCityDamage(damage: CityRanking) {
    this.cityRankingState.upsert(damage)
  }

  getSoldierRankingUpdate$() {
    return this.soldierRankingState.selectSoldierRanking()
  }

  getCityRanking() {
    return this.cityRankingState.selectCityRanking(10)
  }

  getTargetRanking() {
    return this.targetRankingState.selectTargetRanking(5)
  }
  
}
