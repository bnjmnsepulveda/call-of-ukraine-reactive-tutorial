import calculateDamageResources from "./calculateDamageResources";
import { Attack } from "../domain/model/Attack";
import { SoldierRanking } from "../domain/model/SoldierRanking";

export function calculateSoldierRanking(attack: Attack, ranking: SoldierRanking): SoldierRanking {

  const damage = attack.weapon.damage
  const soldierName = attack.soldier.name
  const weapon = attack.weapon
  
  if (!ranking) {
    return {
      soldiername: soldierName,
      points: 0,
      statistics: damage
    }
  } else {

    
    const civilians = weapon.damage.civilians
    const soldiers = weapon.damage.soldiers
    const buildings = weapon.damage.buildings
    const tanks = weapon.damage.tanks
    const trucks = weapon.damage.trucks
    const warplanes = weapon.damage.warplanes
    const warships = weapon.damage.warships
    const points = civilians + soldiers + buildings + tanks + trucks + warplanes + warships
    
    return {
      ...ranking,
      points,
      statistics: calculateDamageResources(ranking.statistics, damage)
    }
  }
}