import { EntityBase } from "../../lib/EntityBase";
import { Resource } from "./Resource";

export interface Weapon extends EntityBase {
    
    description: string;
    category: string;
    points: number;
    damage: Resource;
    
}