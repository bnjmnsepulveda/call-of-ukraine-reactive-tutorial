import { Injectable } from '@angular/core';
import { concatMap, EMPTY, filter, iif, isEmpty, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { createSoldier } from '../../../domain/service/createSoldier';
import { Soldier } from 'src/app/core/domain/model/Soldier';
import { SoldierStateService } from '../../../store/service/soldier-state.service';
import { SoldierAlreadyRegisteredError } from '../error/SoldierAlreadyRegisteredError';
import { SessionStateService } from 'src/app/core/store/service/session-state.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private soldierState: SoldierStateService,
    private sessionState: SessionStateService
  ) { }

  registerSoldier(name: string) {
    return this.soldierState.findByName(name).pipe(
      map(soldier => soldier ? false : true),
    ).subscribe(isValidName => {
      if (isValidName) {
        const soldier = createSoldier(name)
        this.soldierState.save(soldier)
        this.sessionState.saveSoldierSession(soldier)
      }
    })
  }

  findSoldiers(){
    return this.soldierState.findAll()
  }


}
