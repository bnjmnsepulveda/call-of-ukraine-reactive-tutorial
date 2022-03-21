import { RussianCity } from "../../domain/model/RussianCity";
import { Soldier } from "../../domain/model/Soldier";
import { Weapon } from "../../domain/model/Weapon";

export interface AttackRequestDTO {
    soldier: Soldier;
    city: RussianCity;
    weapon: Weapon;
}