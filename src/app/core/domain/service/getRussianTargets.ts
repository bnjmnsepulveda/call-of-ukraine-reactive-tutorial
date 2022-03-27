import { RussianTarget } from "../model/RussianTarget";
import { createRussianTarget } from "./getRussianTargetFactory";

const factory = createRussianTarget()

export function getRussianTargets(): RussianTarget[] {
    return [
        factory.createCivilianArea('moscow downtown', 'Moscow'),
        factory.createArmy('ejercito de liberacion 2', 'Moscow'),
        factory.createBunker('bunker de putin', 'stalingrado'),
        factory.createAircraftCarrier('russian blattle ship', 'mar negro'),
        factory.createAircraftCarrier('aeropuerto', 'lenin')
    ]
}
