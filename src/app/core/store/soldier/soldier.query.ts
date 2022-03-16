import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SoldierState, SoldierStore } from './soldier.store';

@Injectable({
    providedIn: 'root'
})
export class SoldierQuery extends QueryEntity<SoldierState> {
  
  constructor(protected override store: SoldierStore) { super(store); }

}