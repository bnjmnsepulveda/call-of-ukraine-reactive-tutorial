import { Component, OnInit } from '@angular/core';
import { GameStarterService } from 'src/app/core/application/service/game-starter.service';
import { RussianCity } from 'src/app/core/domain/model/RussianCity';
import { Weapon } from 'src/app/core/domain/model/Weapon';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  selectedWeapon: Weapon = null
  selectedRussianCity: RussianCity = null

  constructor(private game: GameStarterService) { }

  ngOnInit(): void {
    this.game.loadRussianCountries()
  }

  takeRandomWeapon(weapon: Weapon) {
    console.log('weapon taked', weapon)
    this.selectedWeapon = weapon
  }

  destroyCity(russianCity: RussianCity) {
    console.log('russian city to destroy', russianCity)
    this.selectedRussianCity = russianCity
  }
}
