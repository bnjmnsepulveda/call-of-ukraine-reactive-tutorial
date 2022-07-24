import { Soldier } from "../domain/model/Soldier";
import { Weapon } from "../domain/model/Weapon";

export interface SoldierAttackDTO {
    soldier: Soldier
    weapon: Weapon
}