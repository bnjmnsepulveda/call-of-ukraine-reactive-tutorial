import { Injectable } from '@angular/core';
import { Target } from 'src/app/presentation/pages/game/dto/whac-target.dto';
import { createWeapon } from '../../domain/service/createWeapon';
import { RussianTargetService } from './russian-target.service';

@Injectable({
  providedIn: 'root'
})
export class WhacAMoleService {

  constructor(private russiantargetService: RussianTargetService) { }

  getRandomTarget() {
    const targets = this.getTargets()
    const index = Math.floor(Math.random() * targets.length)
    return targets[index]
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
        target: this.russiantargetService.getByName('bunker putin'),
        weapon
      },
      {
        img: 'assets/russian-target/army.png',
        name: 'ejercito rojo',
        target: this.russiantargetService.getByName('ejercity rojo'),
        weapon
      },
      {
        img: 'assets/russian-target/kremlin.png',
        name: 'Krempin',
        target: this.russiantargetService.getByName('kremlin'),
        weapon
      }
    ]
  }

}
