import { Attack } from "../domain/model/Attack";

export function createNotificationFromAttack(attack: Attack) {
    return {
        soldiername: attack.soldier.name,
        target: attack.russianTarget ? attack.russianTarget.name : null
    }
}