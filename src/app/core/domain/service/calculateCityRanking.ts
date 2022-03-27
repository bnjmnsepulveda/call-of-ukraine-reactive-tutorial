import { Attack } from "../model/Attack";
import { Resource } from "../model/Resource";
import { CityRanking } from "../model/CityRanking";

function updateRussianCityDamage(key: keyof Resource, resources: Resource, damage: Resource) {
    return resources[key] = Math.max(0, resources[key] - damage[key])
}

function getTotalResources(resources: Resource) {
    return Object
        .entries(resources)
        .map(([key, value]) => value)
        .reduce((acc, val) => acc + val, 0)
}

export function calculateCityRanking(attacks: Attack[]): CityRanking {

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
            tanks: updateRussianCityDamage('tanks', resources, damage),
            trucks: updateRussianCityDamage('trucks', resources, damage),
            warplanes: updateRussianCityDamage('warplanes', resources, damage),
            warships: updateRussianCityDamage('warships', resources, damage),
        }

    }

    const totalResources = getTotalResources(russiantarget.resources)
    const remainingResources = getTotalResources(resources)
    const destructionPercentage = 100 - ((remainingResources * 100) / totalResources)

    return {
        id: russiantarget.city,
        name: russiantarget.city,
        remainingResources,
        destructionPercentage,
        totalResources,
        ...resources
    }

}