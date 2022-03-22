import { now } from "../../lib/DateHelper";
import { Soldier } from "../model/Soldier";

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