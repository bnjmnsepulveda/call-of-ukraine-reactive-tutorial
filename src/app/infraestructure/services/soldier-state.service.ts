import { Injectable } from '@angular/core';
import { Soldier } from '../../core/domain/model/Soldier';
import { SoldierQuery } from '../store/soldier.query';
import { SoldierStore } from '../store/soldier.store';

@Injectable({
  providedIn: 'root'
})
export class SoldierStateService {
  
  constructor(private store: SoldierStore, private query: SoldierQuery) { }
  
  findByName(name: string) {
    return this.query.selectEntity(entity => entity.name === name)
  }

  save(entity: Soldier) {
    this.store.add(entity, { prepend: true })     
  }

  findAll() {
    return this.query.selectAll()
  }

  
}
