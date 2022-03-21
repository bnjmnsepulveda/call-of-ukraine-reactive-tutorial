import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { SelectWeaponComponent } from './select-weapon/select-weapon.component';
import { SelectRussianCityComponent } from './select-russian-city/select-russian-city.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WeaponDetailComponent } from './weapon-detail/weapon-detail.component';
import { SoldierRankingComponent } from './soldier-ranking/soldier-ranking.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    GameComponent,
    SelectWeaponComponent,
    SelectRussianCityComponent,
    WeaponDetailComponent,
    SoldierRankingComponent, 
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
