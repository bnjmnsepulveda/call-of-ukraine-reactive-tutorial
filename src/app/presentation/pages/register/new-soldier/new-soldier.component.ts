import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RegisterService } from 'src/app/core/application/service/register.service';
import { RouterService } from 'src/app/presentation/shared/service/router.service';

@Component({
  selector: 'app-new-soldier',
  templateUrl: './new-soldier.component.html',
  styleUrls: ['./new-soldier.component.css']
})
export class NewSoldierComponent {

  name = new FormControl('benjamin');

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
