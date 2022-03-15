import { EntityBase } from "../../lib/EntityBase";
import { Weapon } from "./Weapon";

export interface SoldierPlayer extends EntityBase {
    gamePoints: number;
    successAttacks: number;
    usedWeapons: Weapon[];
}