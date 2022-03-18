import { EntityBase } from "../../lib/EntityBase";
import { Weapon } from "./Weapon";

export interface Soldier extends EntityBase {
    createdAt: Date;
    gamePoints: number;
    successAttacks: number;
    usedWeapons: Weapon[];
}