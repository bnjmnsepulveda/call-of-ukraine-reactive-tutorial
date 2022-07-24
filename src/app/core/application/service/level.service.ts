import { Injectable } from '@angular/core';
import { LevelGame } from '../../../presentation/pages/game/component/ghost-of-kiev/model/LevelGame';
import { createRussianTarget } from '../../domain/service/createRussianTarget';
import { createWeapon } from '../../domain/service/createWeapon';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  levelIndex = 0
  levels: LevelGame[] = [
    {
      invaderDelay: 500,
      movingToRight: 5,
      shootDelay: 20,
      troopColumns: 2,
      troopRows: 2,
      target: createRussianTarget('EjercitoMoscu',{ }),
      weapon: createWeapon({
        name: 'Misil Aire Tierra',
        category: 'Misiles',
        damage: {
          soldiers: 10,
          tanks: 1,
          buildings: 3,
          civilians: 150
        },
        description: 'Misil aire tierra',
      })

    },
    {
      invaderDelay: 500,
      movingToRight: 5,
      shootDelay: 20,
      troopColumns: 3,
      troopRows: 3,
      target: createRussianTarget('EjercitoSnPete',{}),
      weapon: createWeapon({
        name: 'Misil Aire Tierra',
        category: 'Misiles',
        damage: {
          soldiers: 50,
          tanks: 1,
          trucks: 3,
          warplanes: 2
        },
        description: 'Misil aire tierra',
      })
    },
    {
      invaderDelay: 500,
      movingToRight: 3,
      shootDelay: 20,
      troopColumns: 10,
      troopRows: 2,
      target: createRussianTarget('EjercitoXXX1', { }),
      weapon: createWeapon({
        name: 'Misil Aire Tierra',
        category: 'Misiles',
        damage: {
          soldiers: 80,
          tanks: 2,
          trucks: 10,
          warplanes: 3,
          warships: 1
        },
        description: 'Misil aire tierra',
      })
    },
    {
      invaderDelay: 100,
      movingToRight: 3,
      shootDelay: 20,
      troopColumns: 2,
      troopRows: 2,
      target: createRussianTarget('EjercitoXXX2', { }),
      weapon: createWeapon({
        name: 'Misil Aire Tierra',
        category: 'Misiles',
        damage: {
          soldiers: 130,
          tanks: 10,
          warships: 1,
          warplanes: 4
        },
        description: 'Misil aire tierra',
      })
    }
  ]

  constructor() { }

  getFirstLevel() {
    return this.levels[0]
  }

  getCurrentLevel() {
    return this.levels[this.levelIndex]
  }

  nextLevel() {
    this.levelIndex = this.levelIndex + 1
    return this.getCurrentLevel()
  }

}
