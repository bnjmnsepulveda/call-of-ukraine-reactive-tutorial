import { Injectable } from '@angular/core';
import { createRussianTarget } from '../../domain/service/createRussianTarget';
import { createWeapon } from '../../domain/service/createWeapon';
import { getRandomItem } from '../../lib/RandomHelper';
import { GhostOfKievTargetDTO } from '../dto/GhostOfKievTargetDTO';

@Injectable({
  providedIn: 'root'
})
export class GhostOfKievService {

  private ghostOfKievTargets: GhostOfKievTargetDTO[] = [{
    type: 'army',
    name: 'Fuerzas de Operaciones Especiales Rusa',
    img: '/img/not-found.jpg',
    target: createRussianTarget('Ejercito', 'Moscu', {
      soldiers: 27000,
      tanks: 120
    }),
    weapon: createWeapon({
      name: 'Misil Aire Tierra',
      category: 'Misiles',
      damage: {
        soldiers: 100,
        tanks: 1
      },
      description: 'Misil aire tierra',
    })
  },
  {
    type: 'army',
    name: 'Distrito Militar de Leningrado',
    img: '/img/not-found.jpg',
    target: createRussianTarget('Ejercito', 'San Petesburgo', {
      soldiers: 32000,
      tanks: 180
    }),
    weapon: createWeapon({
      name: 'Misil Aire Tierra',
      category: 'Misiles',
      damage: {
        soldiers: 130,
        tanks: 2,
        trucks: 1
      },
      description: 'Misil aire tierra',
    })
  }
]

  constructor() {}

  getRandomRussianArmyTarget() {
    return getRandomItem(this.ghostOfKievTargets.filter(t => t.type === 'army'))
  }

}
