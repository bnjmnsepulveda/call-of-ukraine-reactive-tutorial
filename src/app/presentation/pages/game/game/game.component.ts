import { Component, OnInit } from '@angular/core';
import { GameStarterService } from 'src/app/core/application/service/game-starter.service';
import { GameService } from 'src/app/core/application/service/game.service';
import { RussianCity } from 'src/app/core/domain/model/RussianCity';
import { Weapon } from 'src/app/core/domain/model/Weapon';
import { SessionStateService } from 'src/app/core/store/service/session-state.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  selectedWeapon: Weapon = null
  selectedRussianCity: RussianCity = null

  constructor(
    private starterGame: GameStarterService, 
    private game: GameService,
    private sessionState: SessionStateService
  ) { }

  ngOnInit(): void {
    //this.starterGame.loadRussianCountries()
    this.game.loadRussianCities()
    this.game.russianCitiesStatusSubcription$()
    .subscribe(attackedCity => {
      console.log('russian city attacked', attackedCity)
    })
  }

  takeRandomWeapon(weapon: Weapon) {
    console.log('weapon taked', weapon)
    this.selectedWeapon = weapon
  }

  destroyCity(russianCity: RussianCity) {
    console.log('russian city to destroy', russianCity)
    this.selectedRussianCity = russianCity
    this.game.attackRussianCity({
      soldier: this.sessionState.getSoldier(),
      city: this.selectedRussianCity,
      weapon: this.selectedWeapon
    })
    this.selectedRussianCity = null
    this.selectedWeapon = null
  }

}
