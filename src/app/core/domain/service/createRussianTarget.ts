import { Resource } from "../model/Resource"
import { createResource } from "./createTarget"
import createUniqueID from "./createUniqueID"

export function createRussianTarget(name: string, city: string, resources: Partial<Resource>) {
    return {
        id: createUniqueID(`${city}-${name}`),
        city,
        name,
        resources: createResource(resources)
    }
}
