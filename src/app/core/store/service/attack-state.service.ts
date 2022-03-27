import { Injectable } from '@angular/core';
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

  getBySoldier(soldierId: string) {
    return this.query.getAll({ filterBy : entity => entity.soldier.id === soldierId})
  }

  getByCity(city: string) {
    return this.query.getAll({ filterBy: entity => entity.russianTarget.city === city })
  }

}
