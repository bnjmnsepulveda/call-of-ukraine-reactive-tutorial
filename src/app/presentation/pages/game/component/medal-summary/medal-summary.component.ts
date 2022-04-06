import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'medal-summary',
  template: `
    <div class="box">
      <h1 class="title is-3">Medallas obtenidas</h1>
      <h1 class="title is-2">{{ medalQuantity }} </h1>
      <span class="material-icons is-size-1">military_tech</span>
      <div class="buttons is-centered">
        <button class="button is-primary" (click)="playAgain.emit()">Volver al campo de batalla</button>
        <button *ngIf="medalQuantity > 3" class="button is-danger" (click)="playAsPilot.emit()" >Puedes ser piloto</button>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class MedalSummaryComponent implements OnInit {

  @Input() medalQuantity: number;
  @Output() playAgain: EventEmitter<void> = new EventEmitter<void>();
  @Output() playAsPilot: EventEmitter<void> = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit(): void {
  }

}
