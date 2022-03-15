import { Injectable } from '@angular/core';
import { SoldierPlayer } from '../model/SoldierPlayer';

@Injectable({
  providedIn: 'root'
})
export class SoldierPlayerService {

  private soldierPlayers: SoldierPlayer[] = []

  constructor() { }

  add(entity: SoldierPlayer) {
    this.soldierPlayers.push(entity)
  }
  
}
