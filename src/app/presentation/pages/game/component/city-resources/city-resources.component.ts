import { Component, Input, OnInit } from '@angular/core';
import { CityRanking } from 'src/app/core/domain/model/CityRanking';

@Component({
  selector: 'city-resources',
  template: `
    <div style="width: 100px;">
      <p class="is-size-6 has-text-weight-bold">
        {{ranking.name}}
      </p>
      <destruction-percentage [percentage]="ranking.destructionPercentage"></destruction-percentage>
    </div>
  `,
  styles: [
  ]
})
export class CityResourcesComponent implements OnInit {

  @Input() ranking: CityRanking

  constructor() { }

  ngOnInit(): void {
  }

}
