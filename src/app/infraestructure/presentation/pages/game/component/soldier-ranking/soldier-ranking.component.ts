import { Component, OnDestroy, OnInit } from '@angular/core';
import { RankingService } from 'src/app/infraestructure/services/ranking.service';
import { SoldierRanking } from 'src/app/core/domain/model/SoldierRanking';
import { ReactiveComponent } from '../../../../shared/utils/ReactiveComponent';

@Component({
  selector: 'app-soldier-ranking',
  template: `
    <app-panel title="Top 10 Motherfucking Soldiers">      
      <table class="table is-striped tableSection">
        <thead>
          <tr>
            <th>Player</th>
            <th>
              <i class="fas fa-male"></i>
            </th>
            <th>
              <i class="fas fa-building"></i>
            </th>
            <th>
              <i class="fas fa-users"></i>
            </th>
            <th>
              <i class="fas fa-truck"></i>
            </th>
            <th>
            <i class="fas fa-shield"></i>
            </th>
            <th>
              <i class="fas fa-fighter-jet"></i>
            </th>
            <th>
              <i class="fas fa-anchor"></i>
            </th> 
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let sr of soldierRankinks;let i = index">
            <th>{{ i + 1 }} - {{ sr.soldiername }}</th>
            <td>{{ sr.statistics.civilians }}</td>
            <td>{{ sr.statistics.buildings }}</td>
            <td>{{ sr.statistics.soldiers }}</td>
            <td>{{ sr.statistics.trucks }}</td>
            <td>{{ sr.statistics.tanks }}</td>
            <td>{{ sr.statistics.warplanes }}</td>
            <td>{{ sr.statistics.warships }}</td>
          </tr>
          <tr *ngFor="let in of counter(9) ;let i = index">
            <th>Benjamin</th>
            <td>38</td>
            <td>23</td>
            <td>12</td>
            <td>3</td>
            <td>68</td>
            <td>36</td>
            <td>+32</td>
          </tr>
        </tbody>
      </table>   
    </app-panel>
  `
})
export class SoldierRankingComponent extends ReactiveComponent implements OnInit, OnDestroy {

  soldierRankinks: SoldierRanking[] = []

  constructor(private rankingService: RankingService) { super() }
  
  ngOnInit(): void {
    const ranking$ = this.rankingService.getTop10SoldierRanking()
    this.addSubscription(
      ranking$.subscribe(ranking => this.soldierRankinks = ranking)
    )
  }

  ngOnDestroy(): void {
   this.unsubscribeComponent()
  }

  counter(i: number) {
    return new Array(i);
  } 

}
