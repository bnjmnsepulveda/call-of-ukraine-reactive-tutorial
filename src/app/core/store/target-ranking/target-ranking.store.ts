import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { TargetRanking } from '../../domain/model/TargetRanking';

export interface TargetRankingState extends EntityState<TargetRanking, string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'target-ranking' })
export class TargetRankingStore extends EntityStore<TargetRankingState> {

  constructor() {
    super();
  }

}
