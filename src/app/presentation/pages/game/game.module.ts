import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { RankingModule } from '../ranking/ranking.module';
import { SelectWeaponComponent } from './select-weapon/select-weapon.component';
import { SelectRussianCityComponent } from './select-russian-city/select-russian-city.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WeaponDetailComponent } from './weapon-detail/weapon-detail.component';



@NgModule({
  declarations: [
    GameComponent,
    SelectWeaponComponent,
    SelectRussianCityComponent,
    WeaponDetailComponent, 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RankingModule
  ],
  exports:[
    GameComponent
  ]
})
export class GameModule { }
