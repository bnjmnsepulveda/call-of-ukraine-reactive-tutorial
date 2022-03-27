import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { AttackStore, AttackState } from './attack.store';

@Injectable({ providedIn: 'root' })
@QueryConfig({
  sortBy: 'datetime',
  sortByOrder: Order.ASC
})
export class AttackQuery extends QueryEntity<AttackState> {

  constructor(protected override store: AttackStore) {
    super(store);
  }

}
