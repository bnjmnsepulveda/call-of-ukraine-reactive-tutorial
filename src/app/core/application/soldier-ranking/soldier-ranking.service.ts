import { Injectable, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { SoldierService } from '../../domain/service/soldier.service';

@Injectable({
  providedIn: 'root'
})
export class SoldierRankingService {

  constructor(
    private soldierService: SoldierService
  ) { }

  findSoldiers() {
    return this.soldierService.findAll()
  }
}
