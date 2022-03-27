import { RussianTarget } from "../model/RussianTarget"
import { createResource } from "./createTarget"
import createUniqueID from "./createUniqueID"

function createMilitaryBase(name: string, city: string): RussianTarget {
    return {
        id: createUniqueID(`${city}-${name}`),
        city,
        name,
        resources: createResource({
            buildings: 100,
            soldiers: 174000,
            tanks: 1000,
            warplanes: 370,
            trucks: 1200
        })
    }
}

function createArmy(name: string, city: string): RussianTarget {
    return {
        id: createUniqueID(`${city}-${name}`),
        name,
        city,
        resources: createResource({
            buildings: 100,
            soldiers: 5000000,
            tanks: 1000,
            warplanes: 4000,
            trucks: 1200,
            warships: 30
        })
    }
}

function createBunker(name: string, city: string): RussianTarget {
    return {
        id: createUniqueID(`${city}-${name}`),
        name,
        city,
        resources: createResource({
            soldiers: 1000,
            civilians: 500000
        })
    }
}

function createAircraftCarrier(name: string, city: string): RussianTarget {
    return {
        id: createUniqueID(`${city}-${name}`),
        name,
        city,
        resources: createResource({
            soldiers: 50700,
            tanks: 1000,
            warplanes: 1300
        })
    }
}

function createCivilianArea(name: string, city: string): RussianTarget {
    return {
        id: createUniqueID(`${city}-${name}`),
        name,
        city,
        resources: createResource({
        buildings: 3000,
        civilians: 100222333,
        soldiers: 1260300,
        tanks: 830,
        warplanes: 170,
        trucks: 2000
    })}
}

export function createRussianTarget() {
    return {
        createMilitaryBase,
        createArmy,
        createBunker,
        createAircraftCarrier,
        createCivilianArea
    }
}