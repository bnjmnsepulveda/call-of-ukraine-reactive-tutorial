import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { AttackService } from 'src/app/core/application/service/attack.service';
import { RussianCityService } from 'src/app/core/application/service/russian-city.service';
import { RussianTargetService } from 'src/app/core/application/service/russian-target.service';
import { RankingService } from 'src/app/core/application/service/soldier-ranking.service';
import { UkraineArmyService } from 'src/app/core/application/service/ukraine-army.service';
import { Attack } from 'src/app/core/domain/model/Attack';
import { RussianCity } from 'src/app/core/domain/model/RussianCity';
import { RussianTarget } from 'src/app/core/domain/model/RussianTarget';
import { Target } from 'src/app/core/domain/model/Target';
import { Weapon } from 'src/app/core/domain/model/Weapon';
import { calculateSoldierRanking } from 'src/app/core/domain/service/calculateSoldierRanking';
import { createNotificationFromAttack } from 'src/app/core/domain/service/createNotificationFromAttack';
import { getRussianCities } from 'src/app/core/domain/service/getRussianCities';
import { getRussianTargets } from 'src/app/core/domain/service/getRussianTargets';
import { AttackStateService } from 'src/app/core/store/service/attack-state.service';
import { SessionStateService } from 'src/app/core/store/service/session-state.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  select: any = selectDefaultValues()

  // selectedWeapon: Weapon = null
  // selectedRussianCity: RussianCity = null
  realtimeAttacks$: Observable<Attack> = null

  notificationMessage: string = null 

  constructor( 
    private sessionState: SessionStateService,
    private ukraineArmyService: UkraineArmyService,
    private russianCityService: RussianCityService,
    private attackService: AttackService,
    private attackState: AttackStateService,
    private rankingService: RankingService,
    private russianTargetService: RussianTargetService
  ) { }
 

  ngOnInit(): void {
    // load russian cities
    this.russianCityService.setRussianCities(getRussianCities())
    // set source realtime subscription
    this.realtimeAttacks$ = this.attackService.getRealtimeAttacks()
    // subscribe source 
    this.realtimeAttacks$.subscribe(a => console.log(`new attack`, a))
    // save on attack8
    const saveAttackOnAppState$ = this.saveAttackOnAppState(this.realtimeAttacks$);
    // calculate ranking
    const calculateSoldierRanking$ = this.calculateSoldierRanking(saveAttackOnAppState$)
    calculateSoldierRanking$.subscribe(ranking => this.rankingService.saveSoldierRanking(ranking))
    // notify attack 
    const notifyAttack$ = this.notifyAttack(this.realtimeAttacks$)
    notifyAttack$.subscribe(message => this.notificationMessage = message)
    
  }

  notifyAttack(attack$: Observable<Attack>) {
    return attack$.pipe(
      map(attack => createNotificationFromAttack(attack)),
      map(attack => `${attack.soldiername} ha atacado sin misericordia a ${attack.target} en la ciudad de ${attack.city} Putin se esta inquietando`),
    )
  }

  saveAttackOnAppState(attack$: Observable<Attack>) {
    return attack$.pipe(
      tap(attack => this.attackState.save(attack))
    )
  }

  calculateSoldierRanking(attack$: Observable<Attack>) {
    return attack$.pipe(
      filter(attack => attack !== null),
      map(attack => attack.soldier.id),
      map(soldierId => this.attackState.getBySoldier(soldierId)),
      map(attacks => calculateSoldierRanking(attacks))
    )
  }

  takeRandomWeapon(weapon: Weapon) {
    this.select.weapon = weapon
  }

  selectRussianCity(russianCity: RussianCity) {
    this.select.russianCity = russianCity
  }

  destroyRussianTarget(russianTarget: RussianTarget) {
    this.select.russianTarget = russianTarget
    this.ukraineArmyService.attackRussianTarget({
      soldier: this.sessionState.getSoldier(),
      russianTarget: this.select.russianTarget,
      weapon: this.select.weapon,
      city: null
    })
  }


}

function selectDefaultValues() {
  return {
    weapon: null, 
    russianCity: null,
    target: null,
    russianTarget: null
  } as any
}