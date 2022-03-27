import { Component, OnDestroy, OnInit } from '@angular/core';
import { concatMap, count, filter, flatMap, from, map, mergeMap, Observable, of, pluck, scan, switchMap, tap, toArray } from 'rxjs';
import { AttackService } from 'src/app/core/application/service/attack.service';
import { RussianCityService } from 'src/app/core/application/service/russian-city.service';
import { RankingService } from 'src/app/core/application/service/soldier-ranking.service';
import { UkraineArmyService } from 'src/app/core/application/service/ukraine-army.service';
import { Attack } from 'src/app/core/domain/model/Attack';
import { RussianCity } from 'src/app/core/domain/model/RussianCity';
import { RussianTarget } from 'src/app/core/domain/model/RussianTarget';
import { Weapon } from 'src/app/core/domain/model/Weapon';
import { calculateRussianCityDamage } from 'src/app/core/domain/service/calculateRussianCityDamage';
import { calculateSoldierRanking } from 'src/app/core/domain/service/calculateSoldierRanking';
import { createNotificationFromAttack } from 'src/app/core/domain/service/createNotificationFromAttack';
import { getRussianCities } from 'src/app/core/domain/service/getRussianCities';
import { AttackStateService } from 'src/app/core/store/service/attack-state.service';
import { SessionStateService } from 'src/app/core/store/service/session-state.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  select: any = selectDefaultValues()
  realtimeAttacks$: Observable<Attack> = null
  subscriptions: any[] = []
  notificationMessage: string = null 

  constructor( 
    private sessionState: SessionStateService,
    private ukraineArmyService: UkraineArmyService,
    private russianCityService: RussianCityService,
    private attackService: AttackService,
    private attackState: AttackStateService,
    private rankingService: RankingService
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }
 

  ngOnInit(): void {
    // load russian cities
    this.russianCityService.setRussianCities(getRussianCities())
    // set source realtime subscription
    this.realtimeAttacks$ = this.attackService.getRealtimeAttacks()
    // subscribe source 
    const realimeAttackSubscription = this.realtimeAttacks$.subscribe(a => console.log(`new attack`, a))
    this.subscriptions.push(realimeAttackSubscription)
    // save on attack8
    const saveAttackOnAppState$ = this.saveAttackOnAppState(this.realtimeAttacks$);
    // calculate ranking
    const calculateSoldierRanking$ = this.calculateSoldierRanking(saveAttackOnAppState$)
    const calculateSoldierrankingSubscription = calculateSoldierRanking$.subscribe(ranking => this.rankingService.saveSoldierRanking(ranking))
    this.subscriptions.push(calculateSoldierrankingSubscription)
    // calculate resources
    const calculateTargetResources$ = this.calculateTargetResources(saveAttackOnAppState$)
    const calculateTargetResourcesSubscription = calculateTargetResources$.subscribe(a => console.log('attacks by city', a))
    this.subscriptions.push(calculateTargetResourcesSubscription)
    // notify attack 
    const notifyAttack$ = this.notifyAttack(this.realtimeAttacks$)
    const notifyAttackSubscription = notifyAttack$.subscribe(message => this.notificationMessage = message)
    this.subscriptions.push(notifyAttackSubscription)
    
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
      map(attacks => calculateSoldierRanking(attacks)),
    )
  }

  calculateTargetResources(attack$: Observable<Attack>) {
    return attack$.pipe(
      pluck('russianTarget', 'city'),
      map(cityname => this.attackState.getByCity(cityname)),
      map(attacks => calculateRussianCityDamage(attacks))
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

