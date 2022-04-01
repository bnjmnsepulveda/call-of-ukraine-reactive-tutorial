import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'destruction-percentage',
  template: `
  <div>
    <p>
      <span class="material-icons has-text-danger">local_fire_department</span>
    </p>
    <p>
      {{ percentage | number:'1.0-1' }} %
    </p>
  </div>
  `,
  styles: [
  ]
})
export class DestructionPercentageComponent implements OnInit {

  @Input() percentage: number = 0

  constructor() { }

  ngOnInit(): void {
  }

}
