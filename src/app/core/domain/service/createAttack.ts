import { AttackRequestDTO } from "../../application/dto/AttackRequestDTO";
import { now } from "../../lib/DateHelper";
import { Attack } from "../model/Attack";
import createUniqueID from "./createUniqueID";
import { createSoldier } from "./createSoldier";
import { getRandomTestSoldier } from "./getRandomTestSoldier";

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