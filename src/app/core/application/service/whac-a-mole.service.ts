import { Injectable } from '@angular/core';
import { Target } from 'src/app/presentation/pages/game/dto/whac-target.dto';
import { RussianTarget } from '../../domain/model/RussianTarget';
import { createRussianTarget } from '../../domain/service/createRussianTarget';
import { createWeapon } from '../../domain/service/createWeapon';

type TargetName = 'bunker putin' | 'Batallon Ruso' | 'ejercity rojo' | 'kremlin'

@Injectable({
  providedIn: 'root'
})
export class WhacAMoleService {

  private russianTargets: RussianTarget[] = [
    createRussianTarget('bunker putin' , 'moscu', { 
      civilians: 0,
      soldiers: 20000,
      trucks: 100
    }),
    createRussianTarget('Batallon Ruso' , 'moscu', { 
      civilians: 0,
      soldiers: 20000,
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

  getRandomTarget() {
    const targets = this.getTargets()
    const index = Math.floor(Math.random() * targets.length)
    return targets[index]
  }

  getByName(name: TargetName) {
    return this.russianTargets.find(rt => rt.name === name)
  }

  getTargets(): Target[] {
    
    const weapon = createWeapon({
      name: 'Misil reactivo',
      description: 'Misil de destruccion masiva',
      category: 'Misiles',
      damage: {
        civilians: 10,
        soldiers: 10,
        buildings: 10,
        tanks: 10,
        trucks: 10,
        warplanes: 10,
        warships: 10,
      },
    })

    return [
      {
        img: 'assets/russian-target/putin1.png',
        name: 'Bunker de putin',
        target: this.getByName('bunker putin'),
        weapon
      },
      {
        img: 'assets/russian-target/army.png',
        name: 'ejercito rojo',
        target: this.getByName('ejercity rojo'),
        weapon
      },
      {
        img: 'assets/russian-target/kremlin.png',
        name: 'Krempin',
        target: this.getByName('kremlin'),
        weapon
      }
    ]
  }

}
