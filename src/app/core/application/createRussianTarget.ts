import { Resource } from "../domain/model/Resource"
import { createResource } from "./createTarget"
import createUniqueID from "./createUniqueID"

export function createRussianTarget(name: string, resources: Partial<Resource>) {
    return {
        id: createUniqueID(`${name}`),
        name,
        resources: createResource(resources)
    }
}
