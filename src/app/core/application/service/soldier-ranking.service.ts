import { Injectable } from '@angular/core';
import { SoldierStateService } from '../../store/service/soldier-state.service';

@Injectable({
  providedIn: 'root'
})
export class SoldierRankingService {

  constructor(
    private soldierState: SoldierStateService
  ) { }

  findSoldiers() {
    return this.soldierState.findAll()
  }
}
