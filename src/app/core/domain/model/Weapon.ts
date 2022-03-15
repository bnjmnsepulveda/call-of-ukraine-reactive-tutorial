import { EntityBase } from "../../lib/EntityBase";

export interface Weapon extends EntityBase {
    
    description: string;
    type: string;
    country: string;
    attackPoints: string;
    accuracyPercentage: number;

}