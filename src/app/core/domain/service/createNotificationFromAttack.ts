import { Attack } from "../model/Attack";

export function createNotificationFromAttack(attack: Attack) {
    return {
        city: attack.russianTarget.city,
        soldiername: attack.soldier.name,
        target: attack.russianTarget ? attack.russianTarget.name : null
    }
}