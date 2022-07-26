import { Component, OnDestroy, OnInit } from '@angular/core';
import { RussiaDestruction } from '../../../../../../core/domain/model/RussiaDestruction';
import RussiaDestructionService from '../../../../../services/russia-destruction.service';
import { ReactiveComponent } from '../../../../shared/utils/ReactiveComponent';

@Component({
  selector: 'app-russia-destruction',
  template: `
    <app-section-panel title="Russia cities">  
    <div class="columns">
      <div class="column">
        <div class="tags are-medium has-addons">
        <!-- <span *ngFor="let city of destruction.targets" class="tag">{{ city }}</span> -->
        <div class="tags has-addons m-1" *ngFor="let city of destruction.targets" >
          <a class="tag">{{ city }}</a>
          <i class="tag fas fa-map"></i>
        </div>
      </div> 
      </div>
      <div class="column">
      <table class="table is-striped">
        <thead>
          <tr>
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
          <tr>
            <td>{{ destruction.damage.civilians }}</td>
            <td>{{ destruction.damage.buildings }}</td>
            <td>{{ destruction.damage.soldiers }}</td>
            <td>{{ destruction.damage.trucks }}</td>
            <td>{{ destruction.damage.tanks }}</td>
            <td>{{ destruction.damage.warplanes }}</td>
            <td>{{ destruction.damage.warships }}</td>
          </tr>
        </tbody>
      </table> 
      </div>
    </div>   
    
        
    </app-section-panel>
  `
})
export class RussiaDestructionComponent extends ReactiveComponent implements OnInit, OnDestroy {

  destruction: RussiaDestruction = null
  
  constructor(
    private russiaDestructionService: RussiaDestructionService
  ) { super() }
  
  ngOnInit(): void {
    const destruction$ = this.russiaDestructionService.selectRussianDestruction()
    this.addSubscription(
      destruction$.subscribe(destruction => this.destruction = destruction)
    )
  }

  ngOnDestroy(): void {
   this.unsubscribeComponent()
  }

}
