import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Attack } from '../../domain/model/Attack';
import { AttackQuery } from '../attack/attack.query';
import { AttackStore } from '../attack/attack.store';

@Injectable({
  providedIn: 'root'
})
export class AttackStateService {

  constructor(
    private store: AttackStore,
    private query: AttackQuery
  ) { }

  save(attack: Attack) {
    this.store.add(attack, { prepend: true})
  }

  selectBySoldier(soldierId: string) {
    return this.query.selectAll({ filterBy : entity => entity.soldier.id === soldierId})
  }

  getBySoldier(soldierId: string) {
    return this.query.getAll({ filterBy : entity => entity.soldier.id === soldierId})
  }

}
