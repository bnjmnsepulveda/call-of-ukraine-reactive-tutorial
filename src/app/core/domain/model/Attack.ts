import { RussianTarget } from "./RussianTarget";
import { Soldier } from "./Soldier";
import { Weapon } from "./Weapon";

export interface Attack {
    id: string;
    soldier: Soldier;
    russianTarget: RussianTarget;
    weapon: Weapon;
    datetime: Date;
}