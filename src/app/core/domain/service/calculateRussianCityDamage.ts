import { Attack } from "../model/Attack";
import { Resource } from "../model/Resource";
import { RussianCityDamage } from "../model/RussianCityDamage";
import createUniqueID from "./createUniqueID";


function updateRussianCityDamage(key: keyof Resource, resources: Resource, damage: Resource) {
    return resources[key] = Math.max(0, resources[key] - damage[key])
}

export function calculateRussianCityDamage(attacks: Attack[]): RussianCityDamage {
    
    const russiantarget = attacks[0].russianTarget
    
    let resources = { 
        ...attacks[0].russianTarget.resources
    }

    for (let a of attacks) {
        const damage = a.weapon.damage
        resources = {
            soldiers: updateRussianCityDamage('soldiers', resources, damage),
            buildings: updateRussianCityDamage('buildings', resources, damage),
            civilians: updateRussianCityDamage('civilians', resources, damage),
            generals: updateRussianCityDamage('generals', resources, damage),
            hospitals: updateRussianCityDamage('hospitals', resources, damage),
            tanks: updateRussianCityDamage('tanks', resources, damage),
            trucks: updateRussianCityDamage('trucks', resources, damage),
            warplanes: updateRussianCityDamage('warplanes', resources, damage),
            warships: updateRussianCityDamage('warships', resources, damage),
        }

    }

    return {
        id: createUniqueID(`${russiantarget.city}`),
        name: russiantarget.city,
        resources
    }
    
}