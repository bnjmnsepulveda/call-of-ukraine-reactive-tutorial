import { Attack } from "../model/Attack";
import { CityRanking } from "../model/CityRanking";
import { Soldier } from "../model/Soldier";
import { SoldierRanking } from "../model/SoldierRanking";
import { TargetRanking } from "../model/TargetRanking";
import { Weapon } from "../model/Weapon";

// export function calculateSoldierRanking(attacks: Attack[]): SoldierRanking {
//     const soldiername = attacks[0].soldier.name
//     const russianCitiesAttacked = getAttackedCities(attacks)
//     const points = attacks.map(a => a.weapon.points).reduce((prev, current) => prev + current, 0)
//     return {
//         soldiername,
//         russianCitiesAttacked,
//         points
//     }

// }

export function calculateSoldierRanking(city: CityRanking, target: TargetRanking, soldier: Soldier, weapon: Weapon): SoldierRanking {

    let points = 0
    const civilians = calculateDamagePoint(target.civilians, weapon.damage.civilians)
    const soldiers = calculateDamagePoint(target.soldiers, weapon.damage.soldiers)
    const buildings = calculateDamagePoint(target.buildings, weapon.damage.buildings)
    const tanks = calculateDamagePoint(target.tanks, weapon.damage.tanks)
    const trucks = calculateDamagePoint(target.trucks, weapon.damage.trucks)
    const warplanes = calculateDamagePoint(target.warplanes, weapon.damage.warplanes)
    const warships = calculateDamagePoint(target.warships, weapon.damage.warships)
    points = civilians + soldiers +buildings+tanks+trucks+warplanes+warships
    return {
        soldiername: soldier.name,
        russianCitiesAttacked: [city.name],
        points,
        statistics: {
            civilians,
            soldiers,
            buildings,
            tanks,
            trucks,
            warplanes,
            warships
        }
    }

}

function calculateDamagePoint(resource: number, damage: number) {
    if (resource === 0) {
        return 0
    }
    if (resource - damage > 0) {
        return damage
    }
    return resource
}

function getAttackedCities(attacks: Attack[]) {

    const fromRussianTargets = attacks
        .filter(attack => attack?.russianTarget)
        .map(attack => attack.russianTarget.city)

    return [
        ...new Set(...fromRussianTargets)
    ]
}