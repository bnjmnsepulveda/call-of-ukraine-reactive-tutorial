import { Component, OnDestroy, OnInit } from '@angular/core';
import { RankingService } from 'src/app/core/application/service/ranking.service';
import { TargetRanking } from 'src/app/core/domain/model/TargetRanking';
import { ReactiveComponent } from 'src/app/presentation/shared/utils/ReactiveComponent';

@Component({
  selector: 'app-target-ranking',
  templateUrl: './target-ranking.component.html',
  styleUrls: ['./target-ranking.component.css']
})
export class TargetRankingComponent extends ReactiveComponent implements OnInit, OnDestroy {

  rankings: TargetRanking[] = []

  constructor(private rankingService: RankingService) { super() }

  ngOnInit(): void {
    this.addSubscription(
      this.rankingService.getTargetRanking().subscribe(rankings => this.rankings = rankings)
    )
  }


  ngOnDestroy(): void {
    this.unsubscribeComponent()
  }

}
