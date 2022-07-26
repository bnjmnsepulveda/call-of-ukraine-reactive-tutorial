import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { RussiaDestructionState, RussiaDestructionStore } from './russian-destruction.store';

@Injectable({ 
    providedIn: 'root' 
})
export class RussiaDestructionQuery extends Query<RussiaDestructionState> {  
  constructor(protected override store: RussiaDestructionStore) {
    super(store);
  }
}