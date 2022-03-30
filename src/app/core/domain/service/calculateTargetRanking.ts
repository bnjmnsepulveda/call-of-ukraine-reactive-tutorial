import { Attack } from "../model/Attack";
import { TargetRanking } from "../model/TargetRanking";
import { calculateRemainigResources } from "./calculateRemainingResources";

export function calculateTargetRanking(attacks: Attack[]): TargetRanking {

    const russiantarget = attacks[0].russianTarget

    const cityRanking = calculateRemainigResources(attacks)

    return {
        id: russiantarget.id,
        name: russiantarget.name,
        ...cityRanking
    }

}