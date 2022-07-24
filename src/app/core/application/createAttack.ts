import createUniqueID from "./createUniqueID";
import { createSoldier } from "./createSoldier";
import { getRandomTestSoldier } from "./getRandomTestSoldier";
import { now } from "../lib/DateHelper";
import { Attack } from "../domain/model/Attack";
import { AttackRequestDTO } from "../dto/AttackRequestDTO";

export function createAttack(attack: AttackRequestDTO): Attack {
    let soldier = attack.soldier
    if (soldier === null) {
        soldier = createSoldier(getRandomTestSoldier())
    }
    return {
        ...attack,
        soldier: soldier,
        id: createUniqueID('attack'),
        datetime: now()
    }
}