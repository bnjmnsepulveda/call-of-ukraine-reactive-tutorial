import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AttackService } from 'src/app/core/application/service/attack.service';
import { RankingService } from 'src/app/core/application/service/ranking.service';
import { UkraineArmyService } from 'src/app/core/application/service/ukraine-army.service';
import { Attack } from 'src/app/core/domain/model/Attack';
import { createNotificationFromAttack } from 'src/app/core/domain/service/createNotificationFromAttack';
import { AttackStateService } from 'src/app/core/store/service/attack-state.service';
import { ReactiveComponent } from 'src/app/presentation/shared/utils/ReactiveComponent';
import { SoldierAttackDTO } from 'src/app/core/application/dto/SoldierAttackDTO';
import { AttackRequestDTO } from 'src/app/core/application/dto/AttackRequestDTO';
import { GhostOfKievGameOverDTO } from '../../../../core/application/dto/GhostOfKievGameOverDTO';
import { LevelGame } from '../component/ghost-of-kiev/model/LevelGame';
import { LevelService } from '../../../../core/application/service/level.service';
import { TargetRankingStateService } from '../../../../core/store/service/target-ranking-state.service';
import { TargetRanking } from '../../../../core/domain/model/TargetRanking';

enum GameState {
  PLAYING,
  WON,
  LOSE
}

@Component({
  selector: 'app-game',
  template: `
  <div class="container  has-text-centered mt-6 is-fluid">
    <h1 class="title is-1">Centro de mando soldado</h1>

    <app-notify class="m-3" [title]="'Nuevo ataque!!'" [message]="notificationMessage" ></app-notify>
    
    <div class="columns">
        <div class="column is-5">
            <app-soldier-ranking></app-soldier-ranking>
            <app-target-ranking></app-target-ranking>
        </div>
        <div class="column is-7">
        <div [ngSwitch]="gameState">
          <!-- GHOST OF KIEV GAME -->
          <div *ngSwitchCase="gameStateOptions.PLAYING">
            <app-reactive-ghost-of-kiev 
              [invaderDelay]="level.invaderDelay"
              [shootDelay]="level.shootDelay"
              [troopRows]="level.troopRows"
              [troopColumns]="level.troopColumns"
              [movingToRight]="level.movingToRight"
              (onGameOver)="onGameOver($event)" 
              (onAttack)="onGhostOfKievAttack($event)"></app-reactive-ghost-of-kiev>
          </div>
          <!-- WINNER MESSAGE -->
          <div *ngSwitchCase="gameStateOptions.WON">
            <app-win-message (onContinue)="onPlayAgain()"></app-win-message>
          </div>
          <!-- LOSER MESSAGE -->
          <div *ngSwitchCase="gameStateOptions.LOSE">
            <app-fail-message (onContinue)="onPlayAgain()"></app-fail-message>
          </div>
          <div *ngSwitchDefault>Select a game</div>
        </div>
        </div>
    </div>
  </div>
  `
})
export class GameComponent extends ReactiveComponent implements OnInit, OnDestroy {

  select: any = selectDefaultValues()
  notificationMessage: string = null
  level: LevelGame; 
  gameState: GameState = GameState.PLAYING;
  gameStateOptions = GameState;

  constructor(
    private ukraineArmyService: UkraineArmyService,
    private attackService: AttackService,
    private attackState: AttackStateService,
    private rankingService: RankingService,
    private levelService: LevelService,
    private targetRankingState: TargetRankingStateService,
  ) { super() }

  ngOnInit(): void {
    // init level
    this.level = this.levelService.getFirstLevel()
    // create observables
    const realtimeAttacks$ = this.attackService.getRealtimeAttacks()
    const saveAttackOnAppState$ = this.saveAttackOnAppState(realtimeAttacks$);
    const targetRanking$ = this.calculateTargetRanking(realtimeAttacks$)
    const soldierRanking$ = this.calculateSoldierRanking(realtimeAttacks$)
    const notifyAttack$ = this.notifyAttack(realtimeAttacks$)
    // create subscription add subscription to component base for cleanup all resources
    this.addSubscription(
      saveAttackOnAppState$.subscribe(),
      realtimeAttacks$.subscribe(a => console.log(`new attack`, a)),
      notifyAttack$.subscribe(message => this.notificationMessage = message),
      targetRanking$.subscribe(tr => this.targetRankingState.upsert(tr)),
      soldierRanking$.subscribe(sr => this.rankingService.saveSoldierRanking(sr))
    )
  }

  ngOnDestroy(): void {
    this.unsubscribeComponent()
  }

  onGhostOfKievAttack(attack: AttackRequestDTO) {
    console.log('Ghost-of-kiev-attack', attack)
    this.ukraineArmyService.attackRussianTarget(attack)
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

    const soldierAttack$ = attack$.pipe(map(attack => ({ soldier: attack.soldier, weapon: attack.weapon } as SoldierAttackDTO)))
    
    return soldierAttack$.pipe(
      map(({ soldier, weapon}) => {
        let points = 0
        const civilians = weapon.damage.civilians
        const soldiers = weapon.damage.soldiers
        const buildings = weapon.damage.buildings
        const tanks = weapon.damage.tanks
        const trucks = weapon.damage.trucks
        const warplanes = weapon.damage.warplanes
        const warships = weapon.damage.warships
        points = civilians + soldiers + buildings + tanks + trucks + warplanes + warships
        return {
            soldiername: soldier.name,
            points,
            statistics: {
                civilians,
                soldiers,
                buildings,
                tanks,
                trucks,
                warplanes,
                warships
            }
        }
    })
    )
  }

  calculateTargetRanking(attack$: Observable<Attack>) {
     return attack$.pipe(
      map(a => {
        const damage = a.weapon.damage
        const ranking = this.targetRankingState.getByName(a.russianTarget.name)
        if (!ranking) {
          return {
            id: a.russianTarget.name,
            name: a.russianTarget.name,
            ...damage
          } as TargetRanking
        }
        return {
          ...ranking,
          civilians: ranking.civilians + damage.civilians,
          soldiers: ranking.soldiers + damage.soldiers,
          buildings: ranking.buildings + damage.buildings,
          tanks: ranking.tanks + damage.tanks,
          trucks: ranking.trucks + damage.trucks,
          warplanes: ranking.warplanes + damage.warplanes,
          warships: ranking.warships + damage.warships
        }
      })
    )
  }

  onAttack(attack: AttackRequestDTO) {
    this.ukraineArmyService.attackRussianTarget(attack)
  }

  onGameOver(result: GhostOfKievGameOverDTO) {

    this.gameState = result.winner ? GameState.WON : GameState.LOSE
  
    if (result.winner) {
      this.level = this.levelService.nextLevel()
    }

    // const title = result.winner ? 'Felicitaciones campeón' : 'Perdedor verguenza humana'
    // const text = result.winner ? '¿Deseas una nueva misión?' : '¿Deseas una revancha contra estos hijos de puta'
    // const icon = result.winner ? 'success' : 'error'

    // Swal.fire({
    //   title: title,
    //   text: text,
    //   icon: icon,
    //   showCancelButton: true,
    //   confirmButtonText: 'Si',
    //   cancelButtonText: 'No'
    // }).then((result) => {
    //   if (result.value) {

    //   } else if (result.dismiss === Swal.DismissReason.cancel) {

    //   }
    // })

  }

  onPlayAgain() {
    this.gameState = GameState.PLAYING
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

