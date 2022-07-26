import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-win-message',
  template: `
    <app-section-panel title="Level Completed crack">
      <app-title title="Ganaste Campeon"></app-title>
      <span class="material-icons is-size-1">military_tech</span>
      <app-subtitle subtitle="El bastardo de putin obtiene su merecido"></app-subtitle>
      <div class="buttons is-centered">
        <button class="button is-link is-outlined is-success is-rounded" (click)="onContinue.emit()">
          <span class="icon">
            <i class="fas fa-star"></i>
          </span>
          <span>Seguir en la guerra</span>  
        </button>
      </div>
    </app-section-panel>
  `
})
export class WinMessageComponent implements OnInit {

  @Output() onContinue: EventEmitter<undefined> = new EventEmitter<undefined>();
  @Output() onBack: EventEmitter<undefined> = new EventEmitter<undefined>();

  constructor() { }

  ngOnInit(): void {
    
    Swal.fire({
      title: 'Felicitaciones Campeón',
      text: '¿Deseas una nueva misión?',
      icon: 'success' ,
      showCancelButton: true,
      confirmButtonText: 'Si, soy un rambo',
      cancelButtonText: 'No, tengo miedo'
    }).then((result) => {
      if (result.value) {
        this.onContinue.emit()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.onBack.emit()
      }
    })

  }


}
