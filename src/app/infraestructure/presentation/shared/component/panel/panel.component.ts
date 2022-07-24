import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  template: `
  <div class="container  has-text-centered">
      <nav class="panel">
        <p class="panel-heading">{{ title }}</p>
        <ng-content></ng-content>
      </nav>
  </div>
  `,
  styles: [
  ]
})
export class PanelComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
