import { now } from "../../lib/DateHelper";
import { Soldier } from "../model/Soldier";
import createUniqueID from "./createUniqueID";

export function createSoldier(name: string): Soldier {
    return {
        id: createUniqueID(name),
        name: name,
        createdAt: now(),
        gamePoints: 100,
        successAttacks: 0,
        usedWeapons: [] 
    }
}