import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { AttackStore, AttackState } from './attack.store';

@Injectable({ providedIn: 'root' })
export class AttackQuery extends QueryEntity<AttackState> {

  constructor(protected override store: AttackStore) {
    super(store);
  }

}
