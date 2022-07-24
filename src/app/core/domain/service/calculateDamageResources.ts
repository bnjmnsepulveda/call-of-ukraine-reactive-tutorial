import { Resource } from "../model/Resource";

export default function calculateDamageResources(currentResource: Resource, damage: Resource): Resource{

    return {
        buildings: currentResource.buildings + damage.buildings,
        civilians: currentResource.civilians + damage.civilians,
        soldiers: currentResource.soldiers + damage.soldiers,
        tanks: currentResource.tanks + damage.tanks,
        trucks: currentResource.trucks + damage.trucks,
        warplanes: currentResource.warplanes + damage.warplanes,
        warships: currentResource.warships + damage.warships,
    }
}