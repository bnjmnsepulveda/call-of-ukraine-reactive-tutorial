import { EntityBase } from "../../lib/EntityBase";
import { Damage } from "./Damage";

export interface Weapon extends EntityBase {
    
    description: string;
    category: string;
    points: number;
    damage?: Damage;
    
}