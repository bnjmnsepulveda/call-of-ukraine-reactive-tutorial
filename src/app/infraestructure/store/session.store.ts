import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Soldier } from '../../core/domain/model/Soldier';

export interface SessionState {
   name: string;
   soldier: Soldier | null;
}

export function createInitialState(): SessionState {
  return {
    name: '',
    soldier: null
  };
}

@Injectable({ 
    providedIn: 'root' 
})
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialState());
  }
}