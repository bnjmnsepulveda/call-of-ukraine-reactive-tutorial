import { MapLocation } from "../model/MapLocation";
import { RussianCity } from "../model/RussianCity";
import createUniqueID from "./createUniqueID";

interface Properties {
    name: string;
    location: MapLocation;
    population: number;
}

export function createRussianCity(props: Properties, healthPoints= 1000): RussianCity {

    return {
        id: createUniqueID(props.name),
        name: props.name,
        deaths: 0,
        healthPoints,
        location: props.location,
        population: props.population
    }
}