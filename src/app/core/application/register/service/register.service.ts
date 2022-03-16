import { Injectable } from '@angular/core';
import { concatMap, EMPTY, filter, iif, isEmpty, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { createSoldier } from '../../../domain/service/createSoldier';
import { Soldier } from 'src/app/core/domain/model/Soldier';
import { SoldierService } from '../../../domain/service/soldier.service';
import { SoldierAlreadyRegisteredError } from '../error/SoldierAlreadyRegisteredError';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private soldierService: SoldierService
  ) { }

  registerSoldier(name: string) {
    return this.soldierService.findByName(name).pipe(
      map(soldier => soldier ? false : true),
    ).subscribe(isValidName => {
      if (isValidName) {
        this.soldierService.save(createSoldier(name))
      }
    })
  }

  findSoldiers(){
    return this.soldierService.findAll()
  }


}
