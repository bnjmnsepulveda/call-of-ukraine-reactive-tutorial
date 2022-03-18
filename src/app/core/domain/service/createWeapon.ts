import { Weapon } from "../model/Weapon";
import createUniqueID from "./createUniqueID";

interface Info {
    name: string; 
    description: string; 
    country: string; 
    category: string;
}

export function createWeapon(info :Info, accuracyPercentage=1, attackPoints=100): Weapon {
    return {
        id: createUniqueID(info.name),
        name: info.name,
        description: info.description,
        category: info.category,
        country: info.country,
        accuracyPercentage,
        attackPoints
    }
}