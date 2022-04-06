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
    
    const targetName = attacks[0].russianTarget.name
    
    let initialResources = {
        ...attacks[0].russianTarget.resources
    }

    for (let rd of resourceAndDamage) {
        const damage = rd.damage
        initialResources = {
            soldiers: updateRussianCityDamage('soldiers', initialResources, damage),
            buildings: updateRussianCityDamage('buildings', initialResources, damage),
            civilians: updateRussianCityDamage('civilians', initialResources, damage),
            tanks: updateRussianCityDamage('tanks', initialResources, damage),
            trucks: updateRussianCityDamage('trucks', initialResources, damage),
            warplanes: updateRussianCityDamage('warplanes', initialResources, damage),
            warships: updateRussianCityDamage('warships', initialResources, damage),
        }

    }

    const totalResources = getTotalResources(attacks[0].russianTarget.resources)
    const remainingResources = getTotalResources(initialResources)
    const destructionPercentage = 100 - ((remainingResources * 100) / totalResources)

    return {
        destructionPercentage,
        remainingResources,
        totalResources,
        ...initialResources
    }
    
}