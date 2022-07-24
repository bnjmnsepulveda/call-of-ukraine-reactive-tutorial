import { RussianTarget } from "../domain/model/RussianTarget";
import { Soldier } from "../domain/model/Soldier";
import { Weapon } from "../domain/model/Weapon";

export interface AttackRequestDTO {
    soldier: Soldier;
    russianTarget: RussianTarget;
    weapon: Weapon;
}