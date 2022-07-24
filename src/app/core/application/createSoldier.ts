import { Soldier } from "../domain/model/Soldier";
import { now } from "../lib/DateHelper";

export function createSoldier(name: string): Soldier {
    return {
        id: name,
        name: name,
        createdAt: now(),
        gamePoints: 100,
        successAttacks: 0,
        usedWeapons: [] 
    }
}