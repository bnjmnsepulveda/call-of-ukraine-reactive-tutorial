import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/infraestructure/services/register.service';
import { RouterService } from 'src/app/infraestructure/services/router.service';
import Swal from 'sweetalert2';
import { MAX_SOLDIERNAME_LENGTH } from '../../../../../core/constants';

@Component({
  selector: 'app-new-soldier',
  template: `
    <div class="container has-text-centered mt-6 is-fluid" style="width: 700px;">
      <img src="assets//logo-register.png" class="m-6" width="200" alt="Icono war">
      <h1 class="title is-1 ">Registrate en la legión WITI</h1>
      <div class="field is-grouped">
          <p class="control is-expanded">
            <input id="name" (keyup.enter)="name.valid && onAddSoldier()" [maxLength]="maxNameLenght" type="text" class="input" [formControl]="name" placeholder="Indicanos tu nombre soldado">
          </p>
          <p class="control">
            <button class="button is-info" type="submit" (click)="onAddSoldier()" [disabled]="!name.valid">UNIRSE A LA GUERRA</button>
          </p>
      </div>
    </div>
  `,
})
export class NewSoldierComponent {

  maxNameLenght = MAX_SOLDIERNAME_LENGTH
  name = new FormControl(null,[
    Validators.required,
  ]);

  constructor(
    private registerService: RegisterService,
    private router: RouterService
  ) { }

  onAddSoldier() {
    
    const soldierName = this.name.value
    
    this.registerService.registerSoldierName(soldierName).subscribe({
      next: () => this.goToGamePage(),
      error: err => this.showErrorMessage(err.message)
    })

  }

  goToGamePage() {
    this.router.goToGame()
  }

  showErrorMessage(message: string) {
    Swal
      .fire({
        title: 'Usuario no Válido',
        text: message,
        icon: 'error' ,
        showCancelButton: true,
        confirmButtonText: 'Ok'
      })
      .then()
  }

}
