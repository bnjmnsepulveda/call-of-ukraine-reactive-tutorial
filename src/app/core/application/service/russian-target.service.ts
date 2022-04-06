import { Injectable } from '@angular/core';
import { RussianTarget } from '../../domain/model/RussianTarget';
import { createRussianTarget } from '../../domain/service/createRussianTarget';


type TargetName = 'bunker putin' | 'ejercity rojo' | 'kremlin'

@Injectable({
  providedIn: 'root'
})
export class RussianTargetService {

  private russianTargets: RussianTarget[] = [
    createRussianTarget('bunker putin' , 'moscu', { 
      civilians: 100,
      soldiers: 100,
      trucks: 100
    }),
    createRussianTarget('ejercity rojo', 'stalingrado', {
      soldiers: 100,
      trucks: 100,
      tanks: 100,
      warplanes: 100,
    }),
    createRussianTarget('kremlin', 'moscu', {
      soldiers: 100,
      trucks: 100,
      tanks: 100,
      warplanes: 100,
      warships: 100,
      buildings: 100,
      civilians: 100
    })
  ] 

  constructor() { }

  getByName(name: TargetName) {
    return this.russianTargets.find(rt => rt.name === name)
  }

  all() {
    return this.russianTargets
  }

}
