import { Weapon } from "../model/Weapon";
import createUniqueID from "./createUniqueID";

interface Properties {
    name: string; 
    description: string; 
    country: string; 
    category: string;
}

export function createWeapon(props :Properties, accuracyPercentage=1, attackPoints=100): Weapon {
    return {
        id: createUniqueID(props.name),
        name: props.name,
        description: props.description,
        category: props.category,
        country: props.country,
        accuracyPercentage,
        attackPoints
    }
}