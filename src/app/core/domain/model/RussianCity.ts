import { EntityBase } from "../../lib/EntityBase";
import { MapLocation } from "./MapLocation";
import { Target } from "./Target";

export interface RussianCity extends EntityBase {

    targets?: Target[];
    location: MapLocation;
    
}