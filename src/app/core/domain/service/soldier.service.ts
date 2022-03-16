import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Soldier } from 'src/app/core/domain/model/Soldier';

@Injectable({
  providedIn: 'root'
})
export class SoldierService {

  private cache: Soldier[] = []
  
  constructor() { }
  
  add(entity: Soldier): Observable<Soldier> {
    this.cache.push(entity)
    return of(entity)
  }

  findAll() {
    return of(this.cache)
  }

  
}
