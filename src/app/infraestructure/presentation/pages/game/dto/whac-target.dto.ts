import { RussianTarget } from "src/app/core/domain/model/RussianTarget";
import { Weapon } from "src/app/core/domain/model/Weapon";

export interface WhacTarget {
    id: number;
    selected: boolean;
    target?: Target;
}

export interface Target {
    name: string;
    img: string;
    target: RussianTarget;
    weapon: Weapon;
  }