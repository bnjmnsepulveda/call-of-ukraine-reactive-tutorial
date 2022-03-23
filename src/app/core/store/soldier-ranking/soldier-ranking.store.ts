import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { SoldierRanking } from '../../domain/model/SoldierRanking';

export interface SoldierRankingState extends EntityState<SoldierRanking, string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'soldier-ranking' ,idKey: 'soldiername' })
export class SoldierRankingStore extends EntityStore<SoldierRankingState> {

  constructor() {
    super();
  }

}
