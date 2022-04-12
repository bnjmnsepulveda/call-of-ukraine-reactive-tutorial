import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WeaponSelectorService } from './../../../../../app/core/application/service/weapon-selector.service';
import { Weapon } from 'src/app/core/domain/model/Weapon';

@Component({
  selector: 'app-select-weapon',
  templateUrl: './select-weapon.component.html',
  styleUrls: ['./select-weapon.component.css']
})
export class SelectWeaponComponent implements OnInit {

  weapon: Weapon = null;
  @Output() weaponChange: EventEmitter<Weapon> = new EventEmitter<Weapon>();

  constructor(private weaponSelectorService: WeaponSelectorService) { }

  ngOnInit(): void {
    this.weaponSelectorService.getRandomWeapon()
    .subscribe(weapon => this.weapon = weapon)
  }

  getWeapon() {
    this.weaponChange.emit(this.weapon)
  }

}
