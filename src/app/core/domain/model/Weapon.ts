import { EntityBase } from "../../lib/EntityBase";

export interface Weapon extends EntityBase {
    
    description: string;
    category: string;
    country: string;
    attackPoints: number;
    accuracyPercentage: number;

}