import { AttackRequestDTO } from "../../application/dto/AttackRequestDTO";
import { now } from "../../lib/DateHelper";
import { Attack } from "../model/Attack";
import createUniqueID from "./createUniqueID";

export function createAttack(attack: AttackRequestDTO):Attack {
    return {
        ...attack,
        id: createUniqueID('attack'),
        datetime: now()
    }
}