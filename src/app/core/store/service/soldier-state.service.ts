import { Injectable } from '@angular/core';
import { Soldier } from 'src/app/core/domain/model/Soldier';
import { SoldierQuery } from '../soldier/soldier.query';
import { SoldierStore } from '../soldier/soldier.store';

@Injectable({
  providedIn: 'root'
})
export class SoldierStateService {

  private cache: Soldier[] = []
  
  constructor(
    private store: SoldierStore,
    private query: SoldierQuery
  ) { }
  
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
