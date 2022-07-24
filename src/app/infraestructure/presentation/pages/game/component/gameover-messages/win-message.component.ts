import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';

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
    
    // Swal.fire({
    //   title: 'Felicitaciones campeón',
    //   text: '¿Deseas una nueva misión?',
    //   icon: 'success' ,
    //   showCancelButton: true,
    //   confirmButtonText: 'Si',
    //   cancelButtonText: 'No'
    // }).then((result) => {
    //   if (result.value) {
    //     this.onContinue.emit()
    //   } else if (result.dismiss === Swal.DismissReason.cancel) {
    //     this.onBack.emit()
    //   }
    // })

  }


}
