import { Injectable } from '@angular/core';
import { concatMap, EMPTY, filter, iif, isEmpty, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { createSoldier } from '../../domain/service/createSoldier';
import { SoldierStateService } from '../../store/service/soldier-state.service';
import { SessionStateService } from 'src/app/core/store/service/session-state.service';
import { RouterService } from 'src/app/core/service/router.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private soldierState: SoldierStateService,
    private sessionState: SessionStateService,
    private routerService: RouterService
  ) { }

  registerSoldier(name: string) {
    return this.soldierState.findByName(name).pipe(
      map(soldier => soldier ? false : true),
    ).subscribe(isValidName => {
      if (isValidName) {
        const soldier = createSoldier(name)
        this.soldierState.save(soldier)
        this.sessionState.saveSoldierSession(soldier)
        this.routerService.goToGame()
      }
    })
  }

  findSoldiers(){
    return this.soldierState.findAll()
  }


}
