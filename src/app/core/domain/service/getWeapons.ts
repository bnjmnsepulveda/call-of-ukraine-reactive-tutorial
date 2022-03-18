import { Weapon } from "../model/Weapon";
import { createWeapon } from "./createWeapon";

export function getWeapons(): Weapon[]{
    return [
        createWeapon({name: 'Javelin', description: '127 mm anti-tank missile launcher ', category: 'Anti tanque', country: 'USA'}),
        createWeapon({name: 'Cocktail Molotov', description: 'Arma incendaria hecha con botellas de vidrio combustible y una mecha', category: 'Guerrilla', country: 'N/A'}),
        createWeapon({name: 'Dron', description: 'Dron antitanque', category: 'Avion', country: 'TURQUIA'}),
    ]
}