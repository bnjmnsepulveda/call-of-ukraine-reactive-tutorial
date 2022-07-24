import { RussianTarget } from "../../../../../../core/domain/model/RussianTarget";
import { Weapon } from "../../../../../../core/domain/model/Weapon";

export interface LevelGame {
  invaderDelay: number;
  shootDelay: number;
  troopRows: number;
  troopColumns : number;
  movingToRight: number;
  target: RussianTarget;
  weapon: Weapon;
}