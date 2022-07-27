import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'damage-value',
  template: `
    <span>
          <div>
            <span class="material-icons">
              {{ iconName }}
            </span>
          </div>
          {{ value }}
    </span>
  `,
  styles: [
  ]
})
export class DamageValueComponent {

  @Input()
  value: number
  @Input()
  iconName: string
  
}
