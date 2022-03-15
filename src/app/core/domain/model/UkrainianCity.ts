import { EntityBase } from "../../lib/EntityBase";
import { MapLocation } from "./MapLocation";

export interface UkrainianCity extends EntityBase {
    healthPoints: number;
    population: number;
    deaths: number; 
    location: MapLocation;
    resistancePoints: number;
}