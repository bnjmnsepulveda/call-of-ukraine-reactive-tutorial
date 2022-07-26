import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './component/game/game.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SoldierRankingComponent } from './component/soldier-ranking/soldier-ranking.component';
import { SharedModule } from '../../shared/shared.module';
import { DamageValueComponent } from './component/damage-value/damage-value.component';
import { SoldierPointsComponent } from './component/soldier-points/soldier-points.component';
import { ResourcePointsComponent } from './component/resource-points/resource-points.component';
import { DestructionPercentageComponent } from './component/destruction-percentage/destruction-percentage.component';
import { WhacAMoleComponent } from './component/whac-a-mole/whac-a-mole.component';
import { MedalSummaryComponent } from './component/medal-summary/medal-summary.component';
import { GhostOfKievComponent } from './component/ghost-of-kiev/ghost-of-kiev.component';
import { ReactiveGhostOfKievComponent } from './component/ghost-of-kiev/reactive-ghost-of-kiev.component';
import { FailMessageComponent } from './component/gameover-messages/fail-message.component';
import { WinMessageComponent } from './component/gameover-messages/win-message.component';
import { RussiaDestructionComponent } from './component/russia-destruction/russia-destruction.component';


@NgModule({
  declarations: [
    GameComponent,
    SoldierRankingComponent,
    DamageValueComponent,
    SoldierPointsComponent,
    ResourcePointsComponent,
    DestructionPercentageComponent,
    WhacAMoleComponent,
    MedalSummaryComponent,
    GhostOfKievComponent,
    ReactiveGhostOfKievComponent,
    FailMessageComponent, 
    WinMessageComponent,
    RussiaDestructionComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports:[
    GameComponent
  ]
})
export class GameModule { }
