import { SoldierPlayer } from "../model/SoldierPlayer";
import createUniqueID from "./createUniqueID";

export function createSoldierPlayer(name: string): SoldierPlayer {
    return {
        id: createUniqueID(name),
        name: name,
        createdAt: new Date(),
        gamePoints: 100,
        successAttacks: 0,
        usedWeapons: [] 
    }
}