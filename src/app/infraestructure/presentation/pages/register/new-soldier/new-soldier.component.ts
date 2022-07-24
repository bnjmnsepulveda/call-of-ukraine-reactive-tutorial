import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RegisterService } from 'src/app/infraestructure/services/register.service';
import { RouterService } from 'src/app/infraestructure/presentation/shared/service/router.service';

@Component({
  selector: 'app-new-soldier',
  templateUrl: './new-soldier.component.html',
  styleUrls: ['./new-soldier.component.css']
})
export class NewSoldierComponent {

  name = new FormControl(null);

  constructor(
    private registerService: RegisterService,
    private router: RouterService

  ) { }

  onAddSoldier() {
    const soldierName = this.name.value
    this.registerService.registerSoldier(
      soldierName,
      soldier => {
        this.router.goToGame()
      },
      error => {
        alert(error.message)
      }
    )
  }

}
