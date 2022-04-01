import { Component, Input, OnInit } from '@angular/core';
import { TargetRanking } from 'src/app/core/domain/model/TargetRanking';

@Component({
  selector: 'target-resources',
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
export class TargetResourcesComponent implements OnInit {

  @Input() ranking: TargetRanking
  
  constructor() { }

  ngOnInit(): void {
  }

}
