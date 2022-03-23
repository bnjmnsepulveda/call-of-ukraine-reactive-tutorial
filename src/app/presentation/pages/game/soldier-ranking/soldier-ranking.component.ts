import { Component, OnInit } from '@angular/core';
import { RankingService } from 'src/app/core/application/service/soldier-ranking.service';
import { SoldierRanking } from 'src/app/core/domain/model/SoldierRanking';

@Component({
  selector: 'app-soldier-ranking',
  templateUrl: './soldier-ranking.component.html',
  styleUrls: ['./soldier-ranking.component.css']
})
export class SoldierRankingComponent implements OnInit {

  soldierRankinks: SoldierRanking[] = []
  
  constructor(private rankingService: RankingService) { }

  ngOnInit(): void {
    this.rankingService.getSoldierRankingUpdate$().subscribe(ranking => this.soldierRankinks = ranking)
  }


}
