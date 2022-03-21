import { Injectable } from '@angular/core';
import { Soldier } from '../../domain/model/Soldier';
import { SessionQuery } from '../session/session.query';
import { SessionStore } from '../session/session.store';

@Injectable({
  providedIn: 'root'
})
export class SessionStateService {

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
