import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoldierRankingComponent } from './soldier-ranking/soldier-ranking.component';



@NgModule({
  declarations: [
    SoldierRankingComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    SoldierRankingComponent
  ]
})
export class RankingModule { }
