import { CityRanking } from "../model/CityRanking";
import { Soldier } from "../model/Soldier";
import { SoldierRanking } from "../model/SoldierRanking";
import { TargetRanking } from "../model/TargetRanking";
import { Weapon } from "../model/Weapon";


export function calculateSoldierRanking(soldier: Soldier, weapon: Weapon): SoldierRanking {

    let points = 0

    const civilians = weapon.damage.civilians
    const soldiers = weapon.damage.soldiers
    const buildings = weapon.damage.buildings
    const tanks = weapon.damage.tanks
    const trucks = weapon.damage.trucks
    const warplanes = weapon.damage.warplanes
    const warships = weapon.damage.warships
    
    points = civilians + soldiers + buildings + tanks + trucks + warplanes + warships

    return {
        soldiername: soldier.name,
        // russianCitiesAttacked: [city.name],
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
