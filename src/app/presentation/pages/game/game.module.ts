import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { SelectWeaponComponent } from './select-weapon/select-weapon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WeaponDetailComponent } from './weapon-detail/weapon-detail.component';
import { SoldierRankingComponent } from './soldier-ranking/soldier-ranking.component';
import { SharedModule } from '../../shared/shared.module';
import { SelectTargetComponent } from './select-target/select-target.component';
import { CityRankingComponent } from './city-ranking/city-ranking.component';
import { TargetRankingComponent } from './component/target-ranking/target-ranking.component';
import { DamageValueComponent } from './component/damage-value/damage-value.component';
import { SoldierPointsComponent } from './component/soldier-points/soldier-points.component';
import { ResourcePointsComponent } from './component/resource-points/resource-points.component';
import { DestructionPercentageComponent } from './component/destruction-percentage/destruction-percentage.component';
import { CityResourcesComponent } from './component/city-resources/city-resources.component';


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
