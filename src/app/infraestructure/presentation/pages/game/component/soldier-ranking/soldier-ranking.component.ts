import { Component, OnInit } from '@angular/core';
import { RankingService } from 'src/app/infraestructure/services/ranking.service';
import { SoldierRanking } from 'src/app/core/domain/model/SoldierRanking';

@Component({
  selector: 'app-soldier-ranking',
  template: `
    <app-panel title="Soldados Mas rudos">
      <div *ngIf="soldierRankinks.length > 0">
        <a *ngFor="let sr of soldierRankinks" class="panel-block is-active is-size-7">
          <soldier-points [soldiername]="sr.soldiername"></soldier-points>
          <resource-points [resources]="sr.statistics"></resource-points>
          <!-- <div class="column has-text-danger is-size-6 has-text-weight-bold">
            {{ sr.points }}
          </div> -->
        </a>
      </div>
    </app-panel>
  `
})
export class SoldierRankingComponent implements OnInit {

  soldierRankinks: SoldierRanking[] = []
  
  constructor(private rankingService: RankingService) { }

  ngOnInit(): void {
    this.rankingService.getSoldierRankingUpdate$().subscribe(ranking => this.soldierRankinks = ranking)
  }


}
