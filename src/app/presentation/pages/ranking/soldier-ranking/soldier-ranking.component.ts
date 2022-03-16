import { Component, OnInit } from '@angular/core';
import { SoldierRankingService } from 'src/app/core/application/soldier-ranking/soldier-ranking.service';
import { Soldier } from 'src/app/core/domain/model/Soldier';

@Component({
  selector: 'app-soldier-ranking',
  templateUrl: './soldier-ranking.component.html',
  styleUrls: ['./soldier-ranking.component.css']
})
export class SoldierRankingComponent implements OnInit {

  soldiers: Soldier[] = []

  constructor(private soldierRanking: SoldierRankingService) { }

  ngOnInit(): void {
    this.soldierRanking
      .findSoldiers()
      .subscribe(soldiers => this.soldiers = soldiers)
  }

}
