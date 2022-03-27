import { Component, OnDestroy, OnInit } from '@angular/core';
import { concatMap, count, filter, flatMap, from, map, mergeMap, Observable, of, pluck, scan, Subscription, switchMap, tap, toArray } from 'rxjs';
import { AttackService } from 'src/app/core/application/service/attack.service';
import { RussianCityService } from 'src/app/core/application/service/russian-city.service';
import { RankingService } from 'src/app/core/application/service/ranking.service';
import { UkraineArmyService } from 'src/app/core/application/service/ukraine-army.service';
import { Attack } from 'src/app/core/domain/model/Attack';
import { RussianCity } from 'src/app/core/domain/model/RussianCity';
import { RussianTarget } from 'src/app/core/domain/model/RussianTarget';
import { Weapon } from 'src/app/core/domain/model/Weapon';
import { calculateCityRanking } from 'src/app/core/domain/service/calculateCityRanking';
import { calculateSoldierRanking } from 'src/app/core/domain/service/calculateSoldierRanking';
import { createNotificationFromAttack } from 'src/app/core/domain/service/createNotificationFromAttack';
import { getRussianCities } from 'src/app/core/domain/service/getRussianCities';
import { AttackStateService } from 'src/app/core/store/service/attack-state.service';
import { SessionStateService } from 'src/app/core/store/service/session-state.service';
import { ReactiveComponent } from 'src/app/presentation/shared/utils/ReactiveComponent';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent extends ReactiveComponent implements OnInit, OnDestroy {

  select: any = selectDefaultValues()
  notificationMessage: string = null 

  constructor( 
    private sessionState: SessionStateService,
    private ukraineArmyService: UkraineArmyService,
    private russianCityService: RussianCityService,
    private attackService: AttackService,
    private attackState: AttackStateService,
    private rankingService: RankingService
  ) { super() }

  ngOnInit(): void {
    
    this.russianCityService.setRussianCities(getRussianCities())
    // create observables
    const realtimeAttacks$ = this.attackService.getRealtimeAttacks()  
    const saveAttackOnAppState$ = this.saveAttackOnAppState(realtimeAttacks$);
    const calculateSoldierRanking$ = this.calculateSoldierRanking(saveAttackOnAppState$)
    const calculateTargetResources$ = this.calculateCityRanking(saveAttackOnAppState$)
    const notifyAttack$ = this.notifyAttack(realtimeAttacks$)
    // create subscription
    const realimeAttackSubscription = realtimeAttacks$.subscribe(a => console.log(`new attack`, a))
    const calculateCityrankingSubscription = calculateTargetResources$.subscribe(a => this.rankingService.saveRussianCityDamage(a))
    const calculateSoldierrankingSubscription = calculateSoldierRanking$.subscribe(ranking => this.rankingService.saveSoldierRanking(ranking))
    const notifyAttackSubscription = notifyAttack$.subscribe(message => this.notificationMessage = message)
    // add subscription to component base for cleanup all resources
    this.addSubscription(
      realimeAttackSubscription,
      calculateCityrankingSubscription,
      calculateSoldierrankingSubscription,
      notifyAttackSubscription
    )
    
  }

  ngOnDestroy(): void {
    this.unsubscribeComponent()
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

  calculateCityRanking(attack$: Observable<Attack>) {
    return attack$.pipe(
      pluck('russianTarget', 'city'),
      map(cityname => this.attackState.getByCity(cityname)),
      map(attacks => calculateCityRanking(attacks))
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

