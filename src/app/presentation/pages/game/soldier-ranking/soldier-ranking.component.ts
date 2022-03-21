import { Component, OnInit } from '@angular/core';
import { SoldierRanking } from 'src/app/core/domain/model/SoldierRanking';

@Component({
  selector: 'app-soldier-ranking',
  templateUrl: './soldier-ranking.component.html',
  styleUrls: ['./soldier-ranking.component.css']
})
export class SoldierRankingComponent implements OnInit {

  soldierRankinks: SoldierRanking[] = []
  
  constructor() { }

  ngOnInit(): void {
  }

}
