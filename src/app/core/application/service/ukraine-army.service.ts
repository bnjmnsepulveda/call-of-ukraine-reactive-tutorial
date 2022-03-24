import { Injectable } from '@angular/core';
import { createAttack } from '../../domain/service/createAttack';
import { AttackRequestDTO } from '../dto/AttackRequestDTO';
import { AttackService } from './attack.service';
import { SoldierService } from './soldier.service';

@Injectable({
  providedIn: 'root'
})
export class UkraineArmyService {

  constructor(private attackService: AttackService, private soldierService: SoldierService) { }

  attackRussianCity(attack: AttackRequestDTO) {
    this.attackService.saveAttack(createAttack(attack))
  }

}
