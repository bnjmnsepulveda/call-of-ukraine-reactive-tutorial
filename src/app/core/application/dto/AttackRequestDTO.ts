import { RussianCity } from "../../domain/model/RussianCity";
import { RussianTarget } from "../../domain/model/RussianTarget";
import { Soldier } from "../../domain/model/Soldier";
import { Weapon } from "../../domain/model/Weapon";

export interface AttackRequestDTO {
    soldier: Soldier;
    city: RussianCity;
    russianTarget: RussianTarget;
    weapon: Weapon;
}