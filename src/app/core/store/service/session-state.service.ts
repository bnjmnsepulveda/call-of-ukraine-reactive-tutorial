import { Injectable } from '@angular/core';
import { Soldier } from '../../domain/model/Soldier';
import { SessionStore } from '../session/session.store';

@Injectable({
  providedIn: 'root'
})
export class SessionStateService {

  constructor(private store: SessionStore) { }

  saveSoldierSession(soldier: Soldier) {
    this.store.update({ name: soldier.name, soldier: soldier })
  }

}
