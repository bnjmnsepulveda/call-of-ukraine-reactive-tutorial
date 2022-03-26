import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { RussianTargetState, RussianTargetStore } from './russian-target.store';

@Injectable({ providedIn: 'root' })
export class RussianTargetQuery extends QueryEntity<RussianTargetState> {

  constructor(protected override store: RussianTargetStore) {
    super(store);
  }

}
