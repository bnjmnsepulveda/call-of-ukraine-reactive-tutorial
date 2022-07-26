import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fail-message',
  template: `
  <app-section-panel title="Game Over">
    <app-title title="Perdiste"></app-title>
    <app-subtitle subtitle="Eres una verguenza para tu país"></app-subtitle>
    <div class="panel-block">
      <button class="button is-link is-outlined is-rounded is-fullwidth" (click)="onContinue.emit()">Quiero la revancha</button>
    </div>
  </app-section-panel>
  `
})
export class FailMessageComponent implements OnInit {

  @Output() onContinue: EventEmitter<undefined> = new EventEmitter<undefined>();
  @Output() onBack: EventEmitter<undefined> = new EventEmitter<undefined>();
  
  constructor() { }

  ngOnInit(): void {
    Swal.fire({
      title: 'Perdiste',
      text: '¿Deseas la revancha para destrozar a estos hijos de puta?',
      icon: 'success' ,
      showCancelButton: true,
      confirmButtonText: 'Si quiero venganza',
      cancelButtonText: 'No, soy un pussy'
    }).then((result) => {
      if (result.value) {
        this.onContinue.emit()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.onBack.emit()
      }
    })
  }

}
