import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { interval, last, map, take, tap, } from 'rxjs';
import { AttackRequestDTO } from 'src/app/core/dto/AttackRequestDTO';
import { ReactiveComponent } from 'src/app/infraestructure/presentation/shared/utils/ReactiveComponent';
import { WhacTarget } from './whac-target.dto';
import { WhacaMoleGameOverDTO } from 'src/app/core/dto/WhacaMoleGameOverDTO';
import { SessionService } from '../../../../../services/session.service';
import { WhacAMoleService } from '../../../../../services/whac-a-mole.service';

@Component({
  selector: 'app-whac-a-mole',
  template: `
  <!-- CSS -->
  <style>
    .mole {
      background-image: url("assets/russian-target/putin1.png");
      background-size: cover;
    }
  </style>
   <!-- HTML -->
  <article class="message">
    <div class="message-header">
      <p>Objetivos alcanzados {{ hits }}  Tiempo restante: {{ remainigSeconds }}</p>
    </div>
    <div class="message-body">
      <!-- Smash a russian army -->
      <div *ngIf="!showMedalSummary; else medalSummary" class="box">
        <div class="columns is-multiline">
          <ng-template ngFor let-whacTarget [ngForOf]="whacTargets">
            <div class="column is-3" (click)="hitWhacTarget(whacTarget)" id="{{whacTarget.id}}">
              <img [src]="whacTarget.selected && whacTarget.target? whacTarget.target.img: 'assets/logo-register.png'" width="100"/>
            </div>
          </ng-template>
        </div>
      </div>
      <!-- medals summary -->
      <ng-template #medalSummary>
        <medal-summary [medalQuantity]="hits" (playAgain)="playAgain()" ></medal-summary>
      </ng-template>
      
    </div>
  </article>
  `
})
export class WhacAMoleComponent extends ReactiveComponent implements OnInit, OnDestroy {

  remainigSeconds = 0;
  showMedalSummary = false
  hits = 0

  whacTargets: WhacTarget[] = []

  @Input() seconds = 60
  @Input() delay = 500
  @Output() onAttack: EventEmitter<AttackRequestDTO> = new EventEmitter<AttackRequestDTO>();
  @Output() onGameOver: EventEmitter<WhacaMoleGameOverDTO> = new EventEmitter<WhacaMoleGameOverDTO>();
   
  constructor(private sessionState: SessionService, private whacamoleService: WhacAMoleService) { super() }

  ngOnInit(): void {
    this.initGame(this.delay, this.seconds)
  }

  ngOnDestroy(): void {
    this.unsubscribeComponent()
  }

  setDefaultState() {
    this.remainigSeconds = 0;
    this.showMedalSummary = false
    this.hits = 0
  }

  initGame(delay: number, seconds: number) {
    
    // reset state
    this.setDefaultState()
    this.remainigSeconds = seconds
    // init random target  
    const game$ = this.updateRussianTargetPositions(delay, seconds)
    // normal countdown
    const countDown$ = this.countDown(seconds).pipe(
      tap(() => this.remainigSeconds--),
      last(),
    )

    this.addSubscription(
      game$.subscribe(targets => this.whacTargets = targets),
      countDown$.subscribe(() => this.showMedalSummary = true)
    )
    
  }

  playAgain() {
    this.initGame(this.delay, this.seconds)
  }

  updateRussianTargetPositions(delay: number, seconds: number) {
    
    const limit = (seconds * 1000) / delay

    return interval(delay).pipe(
      take(limit),
      map(() => Math.floor(Math.random() * 10)),
      map(randomIndex => this.getWhacTargets(randomIndex)),
    )

  }

  countDown(seconds: number) {
    return interval(1000).pipe(take(seconds))
  }

  hitWhacTarget(whacTarget: WhacTarget) {
    if (whacTarget.selected) {
      this.hits++
      this.onAttack.emit({
        russianTarget: whacTarget.target.target,
        soldier: this.sessionState.getSoldier(),
        weapon: whacTarget.target.weapon
      })
    }
  }

  getWhacTargets(x: number) {
    const randomIndex  = x
    const indexes = [1,2,3,4,5,6,7,8,9]
    return indexes.map(id =>{ 
      const isSelected = id === randomIndex
      return {
        id,
        selected: isSelected,
        target: isSelected ? this.getRandomTarget() : null
      }
    }
    )
  }

  getRandomTarget() {
    return this.whacamoleService.getRandomTarget()
  }

}




