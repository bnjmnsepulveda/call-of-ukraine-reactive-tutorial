import { RussianTarget } from "./RussianTarget";
import { Soldier } from "./Soldier";
import { Weapon } from "./Weapon";

export interface Attack {
    id: string;
    points: number;
    soldier: Soldier;
    russianTarget: RussianTarget;
    weapon: Weapon;
    datetime: Date;
}