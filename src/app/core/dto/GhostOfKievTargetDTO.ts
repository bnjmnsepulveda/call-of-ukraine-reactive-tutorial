import { RussianTarget } from "../domain/model/RussianTarget";
import { Weapon } from "../domain/model/Weapon";

 export interface GhostOfKievTargetDTO {
     type: string;
     name: string;
     img: string;
     target: RussianTarget;
     weapon: Weapon;
 }