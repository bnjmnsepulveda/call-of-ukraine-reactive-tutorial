import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Soldier } from '../../core/domain/model/Soldier';

export interface SessionState {
   name: string;
   soldier: Soldier | null;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {
  constructor() {
    /**
     * Initial state
     */
    super({
      name: '',
      soldier: null
    });
  }
}