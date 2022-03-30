import { Attack } from "../model/Attack";
import { CityRanking } from "../model/CityRanking";
import { calculateRemainigResources } from "./calculateRemainingResources";


export function calculateCityRanking(attacks: Attack[]): CityRanking {

    const russiantarget = attacks[0].russianTarget
    const cityRanking = calculateRemainigResources(attacks)

    return {
        id: russiantarget.city,
        name: russiantarget.city,
        ...cityRanking
    }

}