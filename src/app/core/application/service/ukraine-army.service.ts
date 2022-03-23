import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Attack } from '../../domain/model/Attack';
import { createAttack } from '../../domain/service/createAttack';
import { AttackRequestDTO } from '../dto/AttackRequestDTO';
import { AttackService } from './attack.service';

@Injectable({
  providedIn: 'root'
})
export class UkraineArmyService {

  constructor(private attackService: AttackService) { }

  attackRussianCity(attack: AttackRequestDTO) {
    this.attackService.saveAttack(createAttack(attack))
  }

  

}
