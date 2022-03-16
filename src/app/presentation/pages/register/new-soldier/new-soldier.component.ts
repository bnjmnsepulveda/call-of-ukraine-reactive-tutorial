import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RegisterService } from 'src/app/core/application/register/service/register.service';
import { Soldier } from 'src/app/core/domain/model/Soldier';

@Component({
  selector: 'app-new-soldier',
  templateUrl: './new-soldier.component.html',
  styleUrls: ['./new-soldier.component.css']
})
export class NewSoldierComponent {

  name = new FormControl('benjamin');
  
  constructor(
    private registerService: RegisterService,
    
  ) { }

  onAddSoldier() {
    this.registerService.registerSoldier(this.name.value)
  }

}
