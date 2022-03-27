import { Component, OnDestroy, OnInit } from '@angular/core';
import { RankingService } from 'src/app/core/application/service/ranking.service';
import { CityRanking } from 'src/app/core/domain/model/CityRanking';
import { ReactiveComponent } from 'src/app/presentation/shared/utils/ReactiveComponent';

@Component({
  selector: 'app-city-ranking',
  templateUrl: './city-ranking.component.html',
  styleUrls: ['./city-ranking.component.css']
})
export class CityRankingComponent extends ReactiveComponent implements OnInit, OnDestroy{

  cityRanking: CityRanking[] = []

  constructor(private rankingService: RankingService) { super() }
  
  ngOnInit(): void {
    this.addSubscription(
      this.rankingService.getCityRanking().subscribe(cityRanking => this.cityRanking = cityRanking),   
    )
  }

  ngOnDestroy(): void {
   this.unsubscribeComponent()
  }

}
