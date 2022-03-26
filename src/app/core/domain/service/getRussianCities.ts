import { createRussianCity } from "./createRussianCity";
import { createTarget } from "./resourceFactory";


const factory = createTarget()


export function getRussianCities() {
    return [
        createRussianCity({name: 'Moscow', location: null, population: 5000000, targets: [
            factory.createArmy('Ejercito checheno'),
            factory.createArmy('Ejercito rojo'),
            factory.createBunker('Refugio de putin'),
            factory.createCivilianArea('Moscu barrio central'),
            factory.createCivilianArea('Moscu barrios del getto'),
            factory.createMilitaryBase('base del zar')
        ]}),
        createRussianCity({name: 'Saint petersburg', location: null, population: 10000000, targets: [
            factory.createMilitaryBase('base del zar')
        ]}),
        createRussianCity({name: 'Stalingrado', location: null, population: 10000000, targets: [
            factory.createMilitaryBase('base del las rusas'),
            factory.createBunker('Refugio de rasputin'),
        ]}),
        createRussianCity({name: 'Leningrado', location: null, population: 6000000, targets: [
            factory.createArmy('Ejercito pro putin'),
        ]}),
        createRussianCity({name: 'Krasnodar', location: null, population: 6000000, targets: [
            factory.createArmy('Fuerza aerea rusa'),
        ]}),
    ]
}