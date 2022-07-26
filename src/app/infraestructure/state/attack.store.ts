import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Attack } from '../../core/domain/model/Attack';

export interface AttackState extends EntityState<Attack> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'attack' })
export class AttackStore extends EntityStore<AttackState> {

  constructor() {
    super();
  }

}
