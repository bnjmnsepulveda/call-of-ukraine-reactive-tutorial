import { Injectable } from '@angular/core';
import { Soldier } from '../../core/domain/model/Soldier';
import { SessionQuery } from '../state/session.query';
import { SessionStore } from '../state/session.store';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private store: SessionStore,
    private query: SessionQuery
  ) { }

  saveSoldierSession(soldier: Soldier) {
    this.store.update({ name: soldier.name, soldier: soldier })
  }

  getSoldier() {
    return this.query.getValue().soldier
  }

}
