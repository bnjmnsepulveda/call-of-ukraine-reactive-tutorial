import { Resource } from "./Resource";
import { Soldier } from "./Soldier";

export interface SoldierRanking {
    soldiername: string;
    points: number;
    russianCitiesAttacked: string[]; 
    statistics?: Resource;
}