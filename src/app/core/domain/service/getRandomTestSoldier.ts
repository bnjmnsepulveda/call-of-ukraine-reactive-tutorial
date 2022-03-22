import { getRandomItem } from "../../lib/RandomHelper";

export function getRandomTestSoldier() {
    return getRandomItem([
        'Jack Bauer',
        'Arnold Schwarzenegger',
        'Rambo',
    ])
}