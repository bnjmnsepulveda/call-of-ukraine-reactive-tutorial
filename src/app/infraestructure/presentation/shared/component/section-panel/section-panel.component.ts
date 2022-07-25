import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-panel',
  template: `
    <article class="container app-section">
      <div class="message-header">
        <p>{{ title }}</p>
      </div>
      <div class="box">
        <ng-content></ng-content>
      </div>
    </article>
  `,
  styles: [
  ]
})
export class SectionPanelComponent implements OnInit {

  @Input() title: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
