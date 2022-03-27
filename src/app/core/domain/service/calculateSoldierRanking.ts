import { Attack } from "../model/Attack";
import { SoldierRanking } from "../model/SoldierRanking";

export function calculateSoldierRanking(attacks: Attack[]): SoldierRanking {
    const soldiername = attacks[0].soldier.name
    const russianCitiesAttacked = getAttackedCities(attacks)
    const points = attacks.map(a => a.weapon.points).reduce((prev, current) => prev + current, 0)
    return {
        soldiername,
        russianCitiesAttacked,
        points
    }

}

function getAttackedCities(attacks: Attack[]) {
    
    const fromRussianTargets = attacks
        .filter(attack => attack?.russianTarget)
        .map(attack => attack.russianTarget.city)
   
    return [
        ...new Set(...fromRussianTargets)
    ]
}