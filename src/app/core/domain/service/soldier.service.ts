import { Injectable } from '@angular/core';
import { Soldier } from 'src/app/core/domain/model/Soldier';
import { SoldierQuery } from '../../store/soldier/soldier.query';
import { SoldierStore } from '../../store/soldier/soldier.store';

@Injectable({
  providedIn: 'root'
})
export class SoldierService {

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
