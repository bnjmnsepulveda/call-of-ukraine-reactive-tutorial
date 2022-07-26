import { Injectable } from '@angular/core';
import { Attack } from '../../core/domain/model/Attack';
import { AttackStore } from '../store/attack.store';

@Injectable({
  providedIn: 'root'
})
export class AttackStateService {

  constructor(
    private store: AttackStore
  ) { }

  save(attack: Attack) {
    this.store.add(attack, { prepend: true})
  }

}
