import { Attack } from "../model/Attack";

export function createNotificationFromAttack(attack: Attack) {
    const city = attack.city ? attack.city.name : attack.russianTarget.city
    return {
        city,
        soldiername: attack.soldier.name,
        target: attack.russianTarget ? attack.russianTarget.name : null
    }
}