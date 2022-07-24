import { Injectable } from '@angular/core';
import { LevelGame } from '../../../presentation/pages/game/component/ghost-of-kiev/model/LevelGame';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  levelIndex = 0
  levels: LevelGame[] = [
    {
      name: 'Infanteria rusa',
      invaderDelay: 500,
      movingToRight: 5,
      shootDelay: 20,
      troopColumns: 2,
      troopRows: 2,
    },
    {
      name: 'Moscu',
      invaderDelay: 500,
      movingToRight: 5,
      shootDelay: 20,
      troopColumns: 3,
      troopRows: 3,
    },
    {
      name: 'Marina rusa',
      invaderDelay: 500,
      movingToRight: 3,
      shootDelay: 20,
      troopColumns: 10,
      troopRows: 2,
    },
    {
      name: 'Stalingado',
      invaderDelay: 100,
      movingToRight: 3,
      shootDelay: 20,
      troopColumns: 2,
      troopRows: 2,
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
