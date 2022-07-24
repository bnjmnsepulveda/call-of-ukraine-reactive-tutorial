import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AttackService } from 'src/app/infraestructure/services/attack.service';
import { RankingService } from 'src/app/infraestructure/services/ranking.service';
import { UkraineArmyService } from 'src/app/infraestructure/services/ukraine-army.service';
import { Attack } from 'src/app/core/domain/model/Attack';
import { AttackStateService } from 'src/app/infraestructure/services/attack-state.service';
import { ReactiveComponent } from 'src/app/infraestructure/presentation/shared/utils/ReactiveComponent';
import { AttackRequestDTO } from 'src/app/core/dto/AttackRequestDTO';
import { GhostOfKievGameOverDTO } from '../../../../../core/dto/GhostOfKievGameOverDTO';
import { LevelGame } from '../component/ghost-of-kiev/model/LevelGame';
import { LevelService } from '../../../../services/level.service';
import { createNotificationFromAttack } from '../../../../../core/application/createNotificationFromAttack';

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
            <app-reactive-ghost-of-kiev [level]="level" (onGameOver)="onGameOver($event)" (onAttack)="onGhostOfKievAttack($event)"></app-reactive-ghost-of-kiev>
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
  ) { super() }

  ngOnInit(): void {
    // init level
    this.level = this.levelService.getFirstLevel()
    // create observables
    const realtimeAttacks$ = this.attackService.getRealtimeAttacks()
    const saveAttackOnAppState$ = this.saveAttackOnAppState(realtimeAttacks$);
    const notifyAttack$ = this.notifyAttack(realtimeAttacks$)
    // create subscription add subscription to component base for cleanup all resources
    this.addSubscription(
      saveAttackOnAppState$.subscribe(),
      realtimeAttacks$.subscribe(a => console.log(`new attack`, a)),
      realtimeAttacks$.subscribe(a => this.rankingService.calculateAndSaveTargetRanking(a)),
      realtimeAttacks$.subscribe(a => this.rankingService.calculateAndSaveSoldierRanking(a)),
      notifyAttack$.subscribe(message => this.notificationMessage = message),
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
      map(attack => `${attack.soldiername} ha atacado sin misericordia a ${attack.target} Putin se esta inquietando`),
    )
  }

  saveAttackOnAppState(attack$: Observable<Attack>) {
    return attack$.pipe(
      tap(attack => this.attackState.save(attack))
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

