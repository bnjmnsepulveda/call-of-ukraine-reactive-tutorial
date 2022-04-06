import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { SelectWeaponComponent } from './select-weapon/select-weapon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WeaponDetailComponent } from './weapon-detail/weapon-detail.component';
import { SoldierRankingComponent } from './soldier-ranking/soldier-ranking.component';
import { SharedModule } from '../../shared/shared.module';
import { SelectTargetComponent } from './select-target/select-target.component';
import { CityRankingComponent } from './component/city-ranking/city-ranking.component';
import { TargetRankingComponent } from './component/target-ranking/target-ranking.component';
import { DamageValueComponent } from './component/damage-value/damage-value.component';
import { SoldierPointsComponent } from './component/soldier-points/soldier-points.component';
import { ResourcePointsComponent } from './component/resource-points/resource-points.component';
import { DestructionPercentageComponent } from './component/destruction-percentage/destruction-percentage.component';
import { CityResourcesComponent } from './component/city-resources/city-resources.component';
import { TargetResourcesComponent } from './component/target-resources/target-resources.component';
import { WhacAMoleComponent } from './component/whac-a-mole/whac-a-mole.component';
import { MedalSummaryComponent } from './component/medal-summary/medal-summary.component';
import { GhostOfKievComponent } from './component/ghost-of-kiev/ghost-of-kiev.component';


@NgModule({
  declarations: [
    GameComponent,
    SelectWeaponComponent,
    WeaponDetailComponent,
    SoldierRankingComponent,
    SelectTargetComponent,
    CityRankingComponent,
    TargetRankingComponent,
    DamageValueComponent,
    SoldierPointsComponent,
    ResourcePointsComponent,
    DestructionPercentageComponent,
    CityResourcesComponent,
    TargetResourcesComponent,
    WhacAMoleComponent,
    MedalSummaryComponent,
    GhostOfKievComponent, 
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
