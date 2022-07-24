import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Soldier } from '../../core/domain/model/Soldier';

export interface SoldierState extends EntityState<Soldier, string> { }

@Injectable({ 
  providedIn: 'root' 
})
@StoreConfig({ 
  name: 'soldiers' 
})
export class SoldierStore extends EntityStore<SoldierState> {
  
  constructor() { super() ; }

}