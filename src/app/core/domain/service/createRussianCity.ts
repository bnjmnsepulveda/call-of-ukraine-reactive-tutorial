import { MapLocation } from "../model/MapLocation";
import { RussianCity } from "../model/RussianCity";
import { Target } from "../model/Target";
import createUniqueID from "./createUniqueID";

interface Properties {
    name: string;
    location: MapLocation;
    population: number;
    targets: Target[];
}

export function createRussianCity(props: Properties, healthPoints=1000): RussianCity {

    return {
        id: createUniqueID(props.name),
        name: props.name,
        location: props.location,
        targets: props.targets ? props.targets : [] 
    }
}