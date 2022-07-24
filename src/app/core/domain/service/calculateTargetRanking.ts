import { Attack } from "../model/Attack";
import { TargetRanking } from "../model/TargetRanking";

export function calculateTargetRanking(attack: Attack, ranking: TargetRanking){
    
    const damage = attack.weapon.damage
    const targetName = attack.russianTarget.name

    if (!ranking) {
      return {
        id: targetName,
        name: targetName,
        ...damage
      } as TargetRanking
    }

    return  {
        ...ranking,
        civilians: ranking.civilians + damage.civilians,
        soldiers: ranking.soldiers + damage.soldiers,
        buildings: ranking.buildings + damage.buildings,
        tanks: ranking.tanks + damage.tanks,
        trucks: ranking.trucks + damage.trucks,
        warplanes: ranking.warplanes + damage.warplanes,
        warships: ranking.warships + damage.warships
    } as TargetRanking

}