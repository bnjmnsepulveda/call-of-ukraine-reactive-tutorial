import { Resource } from "./Resource";

export interface SoldierRanking {
    soldiername: string;
    points: number;
    russianCitiesAttacked: string[]; 
    hits?: Resource;
}