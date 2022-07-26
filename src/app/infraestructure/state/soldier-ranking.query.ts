import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SoldierRankingState, SoldierRankingStore } from './soldier-ranking.store';

@Injectable({ providedIn: 'root' })
export class SoldierRankingQuery extends QueryEntity<SoldierRankingState> {

  constructor(protected override store: SoldierRankingStore) {
    super(store);
  }

}
