import { RussianTarget } from "./RussianTarget";
import { Weapon } from "./Weapon";

export interface LevelGame {
  points: number;
  invaderDelay: number;
  shootDelay: number;
  troopRows: number;
  troopColumns : number;
  movingToRight: number;
  target: RussianTarget;
  weapon: Weapon;
}