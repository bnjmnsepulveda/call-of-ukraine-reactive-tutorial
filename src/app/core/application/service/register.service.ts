import { Injectable } from '@angular/core';
import { concatMap, isEmpty, Observable, of, switchMap, throwError } from 'rxjs';
import { createSoldier } from 'src/app/core/domain/service/createSoldier';
import { Soldier } from 'src/app/core/domain/model/Soldier';
import { SoldierService } from '../../domain/service/soldier.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private soldierService: SoldierService
  ) { }

  registerSoldier(name: string): Observable<Soldier> {
    const player = createSoldier(name)
    return this.soldierService.add(player)
  }

  findSoldiers(){
    return this.soldierService.findAll()
  }


}
