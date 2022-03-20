import { createRussianCity } from "./createRussianCity";

export function getRussianCities() {
    return [
        createRussianCity({name: 'Moscow', location: null, population: 5000000}),
        createRussianCity({name: 'Saint petersburg', location: null, population: 10000000}),
        createRussianCity({name: 'Stalingrado', location: null, population: 10000000}),
        createRussianCity({name: 'Leningrado', location: null, population: 6000000}),
        createRussianCity({name: 'Krasnodar', location: null, population: 6000000}),
    ]
}