import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { calculateRussiaDestruction } from "../../core/application/calculateRussiaDestruction";
import { Attack } from "../../core/domain/model/Attack";
import { RussiaDestruction } from "../../core/domain/model/RussiaDestruction";
import { RussiaDestructionQuery } from "../state/russia-destruction.query";
import { RussiaDestructionStore } from "../state/russian-destruction.store";

@Injectable({ 
    providedIn: 'root' 
})
export default class RussiaDestructionService {

    constructor(
        private store: RussiaDestructionStore, 
        private query: RussiaDestructionQuery 
    ) {}

    calculateAndSaveRussiaDestruction(attack: Attack) {
        const currentDestruction = this.query.getValue()
        const destructionCalculated = calculateRussiaDestruction(attack, currentDestruction)
        this.store.update(destructionCalculated)
    }

    selectRussianDestruction(): Observable<RussiaDestruction> {
        return this.query.select()
    }

}