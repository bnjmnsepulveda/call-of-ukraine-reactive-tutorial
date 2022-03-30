import { Attack } from "../model/Attack";
import { Resource } from "../model/Resource";

interface SummaryResources {
    destructionPercentage: number;
    totalResources: number;
    remainingResources: number;
    civilians: number;
    buildings: number;
    soldiers: number;
    trucks: number;
    tanks: number;
    warplanes: number;
    warships: number;
}

function updateRussianCityDamage(key: keyof Resource, resources: Resource, damage: Resource) {
    return resources[key] = Math.max(0, resources[key] - damage[key])
}

function getTotalResources(resources: Resource) {
    return Object
        .entries(resources)
        .map(([key, value]) => value)
        .reduce((acc, val) => acc + val, 0)
}

export function calculateRemainigResources(attacks: Attack[]): SummaryResources {
    
    const resourceAndDamage = attacks.map(attack => ({ resource: attack.russianTarget.resources, damage: attack.weapon.damage }))
    
    let resources = {
        ...attacks[0].russianTarget.resources
    }

    for (let rd of resourceAndDamage) {
        const damage = rd.damage
        resources = {
            soldiers: updateRussianCityDamage('soldiers', resources, damage),
            buildings: updateRussianCityDamage('buildings', resources, damage),
            civilians: updateRussianCityDamage('civilians', resources, damage),
            tanks: updateRussianCityDamage('tanks', resources, damage),
            trucks: updateRussianCityDamage('trucks', resources, damage),
            warplanes: updateRussianCityDamage('warplanes', resources, damage),
            warships: updateRussianCityDamage('warships', resources, damage),
        }

    }

    const totalResources = getTotalResources(attacks[0].russianTarget.resources)
    const remainingResources = getTotalResources(resources)
    const destructionPercentage = 100 - ((remainingResources * 100) / totalResources)

    return {
        destructionPercentage,
        remainingResources,
        totalResources,
        ...resources
    }
    
}