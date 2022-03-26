import { RussianTarget } from "../model/RussianTarget"
import { createResource } from "./createTarget"
import createUniqueID from "./createUniqueID"

function createMilitaryBase(name: string, city: string): RussianTarget {
    return {
        id: createUniqueID(`${city}-${name}`),
        city,
        name,
        resources: createResource({
            buildings: 10,
            generals: 3,
            soldiers: 17400,
            tanks: 100,
            warplanes: 37,
            trucks: 120
        })
    }
}

function createArmy(name: string, city: string): RussianTarget {
    return {
        id: createUniqueID(`${city}-${name}`),
        name,
        city,
        resources: createResource({
            buildings: 10,
            generals: 3,
            soldiers: 50000,
            tanks: 100,
            warplanes: 400,
            trucks: 120,
            warships: 3
        })
    }
}

function createBunker(name: string, city: string): RussianTarget {
    return {
        id: createUniqueID(`${city}-${name}`),
        name,
        city,
        resources: createResource({
            generals: 3,
            soldiers: 100,
            civilians: 5000
        })
    }
}

function createAircraftCarrier(name: string, city: string): RussianTarget {
    return {
        id: createUniqueID(`${city}-${name}`),
        name,
        city,
        resources: createResource({
            generals: 1,
            soldiers: 5070,
            tanks: 100,
            warplanes: 130
        })
    }
}

function createCivilianArea(name: string, city: string): RussianTarget {
    return {
        id: createUniqueID(`${city}-${name}`),
        name,
        city,
        resources: createResource({
        buildings: 30,
        soldiers: 12603,
        tanks: 83,
        warplanes: 17,
        trucks: 200
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