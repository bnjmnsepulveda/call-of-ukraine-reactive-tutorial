import { Weapon } from "../model/Weapon";
import { createWeapon } from "./createWeapon";

export function getWeapons(): Weapon[]{
    return [
        createWeapon({name: 'Javelin', description: '127 mm anti-tank missile launcher ', category: 'Anti tanque'}, 250),
        createWeapon({name: 'Cocktail Molotov', description: 'Arma incendaria hecha con botellas de vidrio combustible y una mecha', category: 'Guerrilla'}),
        createWeapon({name: 'Dron', description: 'Dron antitanque', category: 'Avion'}, 2500),
        createWeapon({name: 'Misil antiaereo', description: 'Misil de corto alcance tierra - aire', category: 'Misiles'}, 3000),
        createWeapon({name: 'Bomba nuclear 10 MT', description: 'Bomba nuclear devastadora', category: 'Bombas'}, 5000),
        createWeapon({name: 'Ataque biologico', description: 'ataque biologicos', category: 'Ataque biologico'}, 1000),
        createWeapon({name: 'Bombardeo civil', description: 'destruye una ciudad mediante un bombardeo', category: 'bombas'}, 2200),
    ]
}