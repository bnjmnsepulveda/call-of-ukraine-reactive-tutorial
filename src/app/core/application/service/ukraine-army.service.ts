import { Injectable } from '@angular/core';
import { createAttack } from '../../domain/service/createAttack';
import { AttackRequestDTO } from '../dto/AttackRequestDTO';
import { AttackService } from './attack.service';

@Injectable({
  providedIn: 'root'
})
export class UkraineArmyService {

  constructor(private attackService: AttackService) { }

  attackRussianTarget(attack: AttackRequestDTO) {
    this.attackService.saveAttack(createAttack(attack))
  }

}
