import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { RankingModule } from '../ranking/ranking.module';
import { SelectWeaponComponent } from './select-weapon/select-weapon.component';



@NgModule({
  declarations: [
    GameComponent,
    SelectWeaponComponent, 
  ],
  imports: [
    CommonModule,
    RankingModule
  ],
  exports:[
    GameComponent
  ]
})
export class GameModule { }
