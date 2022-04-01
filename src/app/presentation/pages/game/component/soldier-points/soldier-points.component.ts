import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'soldier-points',
  template: `
    <div style="width: 100px;" >
      <span class="has-text-success material-icons">account_circle</span>
      <div>
        {{ soldiername }}
      </div>
    </div>
  `,
  styles: [
  ]
})
export class SoldierPointsComponent implements OnInit {

  @Input()
  soldiername: string

  constructor() { }

  ngOnInit(): void {
  }

}
