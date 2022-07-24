import { Resource } from "../domain/model/Resource";
import { Weapon } from "../domain/model/Weapon";
import { createResource } from "./createTarget";
import createUniqueID from "./createUniqueID";

interface Properties {
    name: string; 
    description: string; 
    category: string;
    damage: Partial<Resource>
}

export function createWeapon(props :Properties, attackPoints=100): Weapon {
    return {
        id: createUniqueID(props.name),
        name: props.name,
        description: props.description,
        category: props.category,
        points: attackPoints,
        damage: createResource(props.damage)
    }
}