import { Injectable } from '@angular/core';
import { CityRanking } from '../../domain/model/CityRanking';
import { SoldierRanking } from '../../domain/model/SoldierRanking';
import { CityRankingStateService } from '../../store/service/city-ranking-state.service';
import { SoldierRankingStateService } from '../../store/service/soldier-ranking-state.service';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(private soldierRankingState: SoldierRankingStateService, private cityRankingState: CityRankingStateService) { }

  saveSoldierRanking(soldierranking: SoldierRanking) {
    this.soldierRankingState.upsert(soldierranking)
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
  
}
