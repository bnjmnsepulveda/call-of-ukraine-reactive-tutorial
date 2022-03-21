import { RussianCity } from "./RussianCity";
import { Soldier } from "./Soldier";
import { Weapon } from "./Weapon";

export interface Attack {
    id: string;
    soldier: Soldier;
    city: RussianCity;
    weapon: Weapon;
    datetime: Date;
}