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


@NgModule({
  declarations: [
    GameComponent,
    SelectWeaponComponent,
    WeaponDetailComponent,
    SoldierRankingComponent,
    SelectTargetComponent,
    CityRankingComponent,
    TargetRankingComponent, 
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
