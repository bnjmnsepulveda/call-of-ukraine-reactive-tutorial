import { Injectable } from '@angular/core';
import { concatMap, map, Observer, of, switchMap, tap, throwError } from 'rxjs';
import { createSoldier } from '../../domain/service/createSoldier';
import { SoldierStateService } from '../../store/service/soldier-state.service';
import { SessionStateService } from 'src/app/core/store/service/session-state.service';
import { SoldierAlreadyRegisteredError } from '../error/SoldierAlreadyRegisteredError';
import { Soldier } from '../../domain/model/Soldier';
import { GameAPI } from '../../api/game.api';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private soldierState: SoldierStateService,
    private sessionState: SessionStateService,
    private gameApi: GameAPI
  ) { }

  registerSoldier(name: string, success: (soldier: Soldier) => void, error?: (e: Error) => void) {
    return this.gameApi.existsSoldierName(name).pipe(
      tap(x => console.log(`name ${name} exist: ${x}`)),
      concatMap(existsSoldierName => !existsSoldierName ? of(createSoldier(name)) : throwError(()=> new SoldierAlreadyRegisteredError(name))),
      switchMap(soldier => this.gameApi.saveSoldier(soldier)),
      tap(soldier => this.soldierState.save(soldier)),
      tap(soldier => this.sessionState.saveSoldierSession(soldier))
    ).subscribe({
      next: success,
      error
    })
  }

}
