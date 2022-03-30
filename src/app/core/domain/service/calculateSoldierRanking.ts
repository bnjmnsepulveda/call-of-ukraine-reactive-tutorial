import { CityRanking } from "../model/CityRanking";
import { Soldier } from "../model/Soldier";
import { SoldierRanking } from "../model/SoldierRanking";
import { TargetRanking } from "../model/TargetRanking";
import { Weapon } from "../model/Weapon";


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
