import { Component, OnDestroy, OnInit } from '@angular/core';
import { RankingService } from 'src/app/infraestructure/services/ranking.service';
import { Resource } from 'src/app/core/domain/model/Resource';
import { TargetRanking } from 'src/app/core/domain/model/TargetRanking';
import { ReactiveComponent } from 'src/app/infraestructure/presentation/shared/utils/ReactiveComponent';

@Component({
  selector: 'app-target-ranking',
  template: `
    <app-panel title="RANKING OBJETIVOS">
      <div *ngIf="rankings.length > 0">
          <p *ngFor="let ranking of rankings" class="panel-block is-active is-size-7">
              <!-- <target-resources [ranking]="ranking"></target-resources> -->
              <span>{{ ranking.name }}</span>
              <resource-points [resources]="mapToResources(ranking)"></resource-points>
          </p>
      </div>
    </app-panel>
  `
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

  mapToResources(ranking: TargetRanking) {
    return {
      ...ranking
    } as Resource
  }

}
