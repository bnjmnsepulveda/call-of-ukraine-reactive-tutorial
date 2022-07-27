import calculateDamageResources from "./calculateDamageResources";
import { Attack } from "../domain/model/Attack";
import { SoldierRanking } from "../domain/model/SoldierRanking";

export function calculateSoldierRanking(attack: Attack, ranking: SoldierRanking): SoldierRanking {

  const damage = attack.weapon.damage
  const soldierName = attack.soldier.name
  const calculatePoints = (p: number) => Math.max(p, 0)

  if (!ranking) {
    return {
      soldiername: soldierName,
      points: calculatePoints(attack.points),
      statistics: damage
    }
  }

  return {
    ...ranking,
    points: calculatePoints(ranking.points + attack.points),
    statistics: calculateDamageResources(ranking.statistics, damage)
  }

}