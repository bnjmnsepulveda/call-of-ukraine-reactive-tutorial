import { Injectable } from '@angular/core';
import { concatMap, of, switchMap, tap, throwError } from 'rxjs';
import { SessionService } from './session.service';
import { SoldierAlreadyRegisteredError } from '../../core/error/SoldierAlreadyRegisteredError';
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

  registerSoldierName(soldiername: string) {
    
    const create = () =>  of(createSoldier(soldiername))
    const sendError = () => throwError(() => new SoldierAlreadyRegisteredError(soldiername))

    return of(soldiername).pipe(
      switchMap(name => this.soldierService.exists(name)),
      concatMap(existsSoldierName => !existsSoldierName ? create() : sendError()),
      switchMap(soldier => this.soldierService.saveSoldier(soldier)),
      tap(soldier => this.sessionState.saveSoldierSession(soldier))
    )
    
  }

}
