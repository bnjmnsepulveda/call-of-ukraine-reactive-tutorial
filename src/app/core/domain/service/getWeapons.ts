import { Weapon } from "../model/Weapon";
import { createWeapon } from "./createWeapon";

export function getWeapons(): Weapon[] {
    return [
        createWeapon({
            name: 'Javelin',
            description: '127 mm anti-tank missile launcher ',
            category: 'Anti tanque',
            damage: {
                soldiers: 5,
                tanks: 1,
                trucks: 1
            }
        }, 250),
        createWeapon({
            name: 'Cocktail Molotov',
            description: 'Arma incendaria hecha con botellas de vidrio combustible y una mecha',
            category: 'Guerrilla',
            damage: {
                civilians: 10,
                soldiers: 10,
                trucks: 1
            }
        }),
        createWeapon({
            name: 'Dron',
            description: 'Dron antitanque',
            category: 'Avion',
            damage: {
                tanks: 10,
                buildings: 1,
                soldiers: 20,
                trucks: 20
            }
        }, 2500),
        createWeapon({
            name: 'Misil antiaereo',
            description: 'Misil de corto alcance tierra - aire',
            category: 'Misiles',
            damage: {
                warplanes: 10
            }
        }, 3000),
        createWeapon({
            name: 'Bomba nuclear 10 MT',
            description: 'Bomba nuclear devastadora',
            category: 'Bombas',
            damage: {
                buildings: 100,
                civilians: 200000,
                soldiers: 75000,
                tanks: 130,
                trucks: 350,
            }
        }, 5000),
        createWeapon({
            name: 'Ataque biologico',
            description: 'ataque biologicos',
            category: 'Ataque biologico',
            damage: {
                soldiers: 2000,
                civilians: 7500
            }
        }, 1000),
        createWeapon({
            name: 'Bombardeo civil',
            description: 'destruye una ciudad mediante un bombardeo',
            category: 'bombas',
            damage: {
                soldiers: 4300,
                civilians: 12000,
                trucks: 268,
                tanks: 103,
                buildings: 10
            }
        }, 2200),
    ]
}