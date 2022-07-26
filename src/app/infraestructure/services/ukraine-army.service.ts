import { Injectable } from '@angular/core';
import { createAttack } from '../../core/application/createAttack';
import { AttackRequestDTO } from '../../core/dto/AttackRequestDTO';
import { AttackService } from './attack.service';

@Injectable({
  providedIn: 'root'
})
export class UkraineArmyService {

  constructor(private attackService: AttackService) { }

  attackRussianTarget(attack: AttackRequestDTO) {
    this.attackService.saveAttackOnBackend(createAttack(attack))
  }

}
