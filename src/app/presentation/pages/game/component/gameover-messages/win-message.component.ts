import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-win-message',
  template: `
  <div>
    <h1>Ganaste Campeon</h1>
    <p>El bastardo de putin obtine su merecido</p>
    <div>
      <button (click)="onContinue.emit()">Seguir en la guerra</button>
      <button (click)="onBack.emit()">Volver con la esposa hijos y la mascota</button>
    </div>
  </div>
  `
})
export class WinMessageComponent implements OnInit {

  @Output() onContinue: EventEmitter<undefined> = new EventEmitter<undefined>();
  @Output() onBack: EventEmitter<undefined> = new EventEmitter<undefined>();

  constructor() { }

  ngOnInit(): void {
  }


}
