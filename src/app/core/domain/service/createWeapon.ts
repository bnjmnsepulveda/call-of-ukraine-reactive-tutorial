import { Weapon } from "../model/Weapon";
import createUniqueID from "./createUniqueID";

interface Properties {
    name: string; 
    description: string; 
    category: string;
}

export function createWeapon(props :Properties, attackPoints=100): Weapon {
    return {
        id: createUniqueID(props.name),
        name: props.name,
        description: props.description,
        category: props.category,
        points: attackPoints
    }
}