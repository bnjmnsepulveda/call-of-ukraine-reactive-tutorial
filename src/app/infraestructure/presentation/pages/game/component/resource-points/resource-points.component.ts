import { Component, Input, OnInit } from '@angular/core';
import { Resource } from 'src/app/core/domain/model/Resource';

@Component({
  selector: 'resource-points',
  template: `
  <div class="columns">
    <div class="column">
      <damage-value [iconName]="'accessibility_new'" [value]="resources.civilians" ></damage-value>
    </div>
    <div class="column">
      <damage-value [iconName]="'apartment'" [value]="resources.buildings" ></damage-value>
    </div>
    <div class="column">
      <damage-value [iconName]="'military_tech'" [value]="resources.soldiers" ></damage-value>
    </div>
    <div class="column">
      <damage-value [iconName]="'local_shipping'" [value]="resources.trucks" ></damage-value>
    </div>
    <div class="column">
      <damage-value [iconName]="'rv_hookup'" [value]="resources.tanks" ></damage-value>           
    </div>
    <div class="column">
      <damage-value [iconName]="'flight'" [value]="resources.warplanes" ></damage-value>
    </div>
    <div class="column">
      <damage-value [iconName]="'directions_boat_filled'" [value]="resources.warships" ></damage-value>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class ResourcePointsComponent implements OnInit {

  @Input()
  resources: Resource

  constructor() { }

  ngOnInit(): void {
  }

}
