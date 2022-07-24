import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TargetRankingStore, TargetRankingState } from './target-ranking.store';

@Injectable({ providedIn: 'root' })
export class TargetRankingQuery extends QueryEntity<TargetRankingState> {

  constructor(protected override store: TargetRankingStore) {
    super(store);
  }

}
