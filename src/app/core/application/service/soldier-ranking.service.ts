import { Injectable } from '@angular/core';
import { map, switchMap, tap } from 'rxjs';
import { SoldierRanking } from '../../domain/model/SoldierRanking';
import { AttackStateService } from '../../store/service/attack-state.service';
import { SoldierRankingStateService } from '../../store/service/soldier-ranking-state.service';
import { AttackService } from './attack.service';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(private soldierRankingState: SoldierRankingStateService) { }


  saveSoldierRanking(soldierranking: SoldierRanking) {
    this.soldierRankingState.upsert(soldierranking)
  }

  getSoldierRankingUpdate$() {
    return this.soldierRankingState.selectSoldierRanking().pipe(

    )
  }
}
