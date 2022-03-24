import { Attack } from "../model/Attack";
import { SoldierRanking } from "../model/SoldierRanking";

export function calculateSoldierRanking(attacks: Attack[]): SoldierRanking {
    const soldiername = attacks[0].soldier.name
    const russianCitiesAttacked = [...new Set(attacks.map(a => a.city.name))]
    const points = attacks.map(a => a.weapon.points).reduce((prev, current) => prev + current, 0)
    return {
        soldiername,
        russianCitiesAttacked,
        points
    }
    
}