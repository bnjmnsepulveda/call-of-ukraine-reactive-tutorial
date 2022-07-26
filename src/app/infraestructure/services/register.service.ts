import { Injectable } from '@angular/core';
import { concatMap, of, switchMap, tap, throwError } from 'rxjs';
import { SessionService } from './session.service';
import { SoldierAlreadyRegisteredError } from '../../core/error/SoldierAlreadyRegisteredError';
import { Soldier } from '../../core/domain/model/Soldier';
import { SoldierService } from './soldier.service';
import { createSoldier } from '../../core/application/createSoldier';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private sessionState: SessionService,
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
