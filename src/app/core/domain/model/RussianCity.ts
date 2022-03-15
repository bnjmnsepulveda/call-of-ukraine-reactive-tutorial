import { EntityBase } from "../../lib/EntityBase";
import { MapLocation } from "./MapLocation";

export interface RussianCity extends EntityBase {

    healthPoints: number;
    population: number;
    deaths: number;
    location: MapLocation;
    
}