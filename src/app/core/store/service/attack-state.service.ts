import { Injectable } from '@angular/core';
import { Order } from '@datorama/akita';
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
    return this.query.getAll({ filterBy: entity => entity.russianTarget?.city === city, sortBy: 'datetime' ,sortByOrder: Order.ASC })
  }

  getByRussianTarget(target: string) {
    return this.query.getAll({ filterBy: entity => entity.russianTarget.name === target, sortBy: 'datetime' ,sortByOrder: Order.ASC })
  }

}
