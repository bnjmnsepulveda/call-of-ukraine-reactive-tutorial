import { Component, OnDestroy, OnInit } from '@angular/core';
import { concatMap, count, filter, flatMap, forkJoin, from, map, merge, mergeMap, Observable, of, pluck, scan, Subscription, switchMap, tap, toArray, zip } from 'rxjs';
import { AttackService } from 'src/app/core/application/service/attack.service';
import { RankingService } from 'src/app/core/application/service/ranking.service';
import { UkraineArmyService } from 'src/app/core/application/service/ukraine-army.service';
import { Attack } from 'src/app/core/domain/model/Attack';
import { RussianTarget } from 'src/app/core/domain/model/RussianTarget';
import { Weapon } from 'src/app/core/domain/model/Weapon';
import { calculateCityRanking } from 'src/app/core/domain/service/calculateCityRanking';
import { calculateTargetRanking } from 'src/app/core/domain/service/calculateTargetRanking';
import { calculateSoldierRanking } from 'src/app/core/domain/service/calculateSoldierRanking';
import { createNotificationFromAttack } from 'src/app/core/domain/service/createNotificationFromAttack';
import { AttackStateService } from 'src/app/core/store/service/attack-state.service';
import { SessionStateService } from 'src/app/core/store/service/session-state.service';
import { ReactiveComponent } from 'src/app/presentation/shared/utils/ReactiveComponent';
import { SoldierAttackDTO } from 'src/app/core/application/dto/SoldierAttackDTO';

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
    private attackService: AttackService,
    private attackState: AttackStateService,
    private rankingService: RankingService
  ) { super() }

  ngOnInit(): void {
    // create observables
    const realtimeAttacks$ = this.attackService.getRealtimeAttacks()  
    const saveAttackOnAppState$ = this.saveAttackOnAppState(realtimeAttacks$);
    const ranking$ = this.calculateRanking(realtimeAttacks$)
    const notifyAttack$ = this.notifyAttack(realtimeAttacks$)
    // create subscription add subscription to component base for cleanup all resources
    this.addSubscription(
      saveAttackOnAppState$.subscribe(),
      realtimeAttacks$.subscribe(a => console.log(`new attack`, a)),
      notifyAttack$.subscribe(message => this.notificationMessage = message),
      ranking$.subscribe(ranking => this.rankingService.saveSoldierRanking(ranking))
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

  calculateRanking(attack$: Observable<Attack>) {
    const cities$ = this.calculateCityRanking(attack$)
    const targets$ = this.calculateTargetRanking(attack$)
    const soldierAttack$ = attack$.pipe(map(attack => ({ soldier: attack.soldier, weapon: attack.weapon } as SoldierAttackDTO)))
    return zip(
     cities$,
     targets$,
     soldierAttack$
    ).pipe(
      map(([city, target, soldierAttack]) =>({ city, target, soldierAttack })),
      tap(ranking => this.rankingService.saveRussianCityDamage(ranking.city)),
      tap(ranking => this.rankingService.saveTargetRanking(ranking.target)),
      map(ranking => calculateSoldierRanking(ranking.city, ranking.target, ranking.soldierAttack.soldier, ranking.soldierAttack.weapon)),
     
    )
  }

  calculateCityRanking(attack$: Observable<Attack>) {
    return attack$.pipe(
      pluck('russianTarget', 'city'),
      map(cityname => this.attackState.getByCity(cityname)),
      map(attacks => calculateCityRanking(attacks))
    )
  }

  calculateTargetRanking(attack$: Observable<Attack>) {
    return attack$.pipe(
      pluck('russianTarget', 'name'),
      map(targetname => this.attackState.getByRussianTarget(targetname)),
      map(attacks => calculateTargetRanking(attacks))
    )
  }

  takeRandomWeapon(weapon: Weapon) {
    this.select.weapon = weapon
  }

  destroyRussianTarget(russianTarget: RussianTarget) {
    this.select.russianTarget = russianTarget
    this.ukraineArmyService.attackRussianTarget({
      soldier: this.sessionState.getSoldier(),
      russianTarget: this.select.russianTarget,
      weapon: this.select.weapon,
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

