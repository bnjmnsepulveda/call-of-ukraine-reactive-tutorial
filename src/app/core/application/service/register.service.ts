import { Injectable } from '@angular/core';
import { concatMap, of, switchMap, tap, throwError } from 'rxjs';
import { createSoldier } from '../../domain/service/createSoldier';
import { SessionStateService } from 'src/app/core/store/service/session-state.service';
import { SoldierAlreadyRegisteredError } from '../error/SoldierAlreadyRegisteredError';
import { Soldier } from '../../domain/model/Soldier';
import { SoldierService } from './soldier.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private sessionState: SessionStateService,
    private soldierService: SoldierService
  ) { }

  registerSoldier(name: string, success: (soldier: Soldier) => void, error?: (e: Error) => void) {
    this.soldierService.exists(name).pipe(
      tap(x => console.log(`name ${name} exist: ${x}`)),
      concatMap(existsSoldierName => !existsSoldierName ? of(createSoldier(name)) : throwError(()=> new SoldierAlreadyRegisteredError(name))),
      switchMap(soldier => this.soldierService.saveSoldier(soldier)),
      tap(soldier => this.sessionState.saveSoldierSession(soldier))
    ).subscribe({
      next: success,
      error
    })
  }

}
