import { Resource } from "../domain/model/Resource";

export function createResource(p: Partial<Resource>): Resource {
    return {
        civilians: p.civilians ? p.civilians : 0,
        buildings: p.buildings ? p.buildings : 0,
        soldiers: p.soldiers ? p.soldiers: 0,
        tanks: p.tanks ? p.tanks : 0,
        trucks: p.trucks ? p.trucks : 0,
        warplanes: p.warplanes ? p.warplanes : 0,
        warships: p.warships ? p.warships : 0
    }
}