import { RussianCity } from "../../domain/model/RussianCity";
import { Weapon } from "../../domain/model/Weapon";

export interface AttackRequestDTO {
    city: RussianCity;
    soldierName: string;
    weapon: Weapon;
}