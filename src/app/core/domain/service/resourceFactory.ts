import { Target } from "../model/Target"
import { createResource } from "./createTarget"

function createMilitaryBase(name: string): Target {
    return {
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

function createArmy(name: string): Target {
    return {
        name,
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

function createBunker(name: string): Target {
    return {
        name,
        resources: createResource({
            generals: 3,
            soldiers: 100,
            civilians: 5000
        })
    }
}

function createAircraftCarrier(name: string): Target {
    return {
        name,
        resources: createResource({
            generals: 1,
            soldiers: 5070,
            tanks: 100,
            warplanes: 130
        })
    }
}

function createCivilianArea(name: string) {
    return {
        name,
        resources: createResource({
        buildings: 30,
        soldiers: 12603,
        tanks: 83,
        warplanes: 17,
        trucks: 200
    })}
}

export function createTarget() {
    return {
        createMilitaryBase,
        createArmy,
        createBunker,
        createAircraftCarrier,
        createCivilianArea
    }
}