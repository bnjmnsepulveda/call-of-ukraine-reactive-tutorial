import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-fail-message',
  template: `
  <div>
    <h1>Perdiste</h1>
    <p>Eres una verguenza para la humanidad</p>
    <div>
      <button (click)="onContinue.emit()">Quiero La Revancha</button>
      <button (click)="onBack.emit()">Huir como una perra</button>
    </div>
  </div>
  `
})
export class FailMessageComponent implements OnInit {

  @Output() onContinue: EventEmitter<undefined> = new EventEmitter<undefined>();
  @Output() onBack: EventEmitter<undefined> = new EventEmitter<undefined>();
  
  constructor() { }

  ngOnInit(): void {
  }

}
