import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notify',
  template: `
  <article class="message is-danger">
    <div class="message-header">
      {{ title }}
      <button class="delete"></button>
    </div>
    <div class="message-body">
    {{ message }}
    </div>
  </article>
  `
})
export class NotifyComponent implements OnInit {

  @Input() title = ''
  @Input() message = ''

  constructor() { }

  ngOnInit(): void {
  }

}
