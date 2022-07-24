import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SoldierRankingComponent } from './soldier-ranking/soldier-ranking.component';
import { SharedModule } from '../../shared/shared.module';
import { TargetRankingComponent } from './component/target-ranking/target-ranking.component';
import { DamageValueComponent } from './component/damage-value/damage-value.component';
import { SoldierPointsComponent } from './component/soldier-points/soldier-points.component';
import { ResourcePointsComponent } from './component/resource-points/resource-points.component';
import { DestructionPercentageComponent } from './component/destruction-percentage/destruction-percentage.component';
import { TargetResourcesComponent } from './component/target-resources/target-resources.component';
import { WhacAMoleComponent } from './component/whac-a-mole/whac-a-mole.component';
import { MedalSummaryComponent } from './component/medal-summary/medal-summary.component';
import { GhostOfKievComponent } from './component/ghost-of-kiev/ghost-of-kiev.component';
import { ReactiveGhostOfKievComponent } from './component/ghost-of-kiev/reactive-ghost-of-kiev.component';
import { FailMessageComponent } from './component/gameover-messages/fail-message.component';
import { WinMessageComponent } from './component/gameover-messages/win-message.component';


@NgModule({
  declarations: [
    GameComponent,
    SoldierRankingComponent,
    TargetRankingComponent,
    DamageValueComponent,
    SoldierPointsComponent,
    ResourcePointsComponent,
    DestructionPercentageComponent,
    TargetResourcesComponent,
    WhacAMoleComponent,
    MedalSummaryComponent,
    GhostOfKievComponent,
    ReactiveGhostOfKievComponent,
    FailMessageComponent, 
    WinMessageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[
    GameComponent
  ]
})
export class GameModule { }
