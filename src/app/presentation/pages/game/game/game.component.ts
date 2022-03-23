import { Component, OnDestroy, OnInit } from '@angular/core';
import { distinct, filter, map, Observable, of, reduce, scan, switchMap, tap } from 'rxjs';
import { AttackService } from 'src/app/core/application/service/attack.service';
import { GameStarterService } from 'src/app/core/application/service/game-starter.service';
import { GameService } from 'src/app/core/application/service/game.service';
import { RankingService } from 'src/app/core/application/service/soldier-ranking.service';
import { UkraineArmyService } from 'src/app/core/application/service/ukraine-army.service';
import { Attack } from 'src/app/core/domain/model/Attack';
import { RussianCity } from 'src/app/core/domain/model/RussianCity';
import { Weapon } from 'src/app/core/domain/model/Weapon';
import { calculateSoldierRanking } from 'src/app/core/domain/service/calculateSoldierRanking';
import { AttackStateService } from 'src/app/core/store/service/attack-state.service';
import { SessionStateService } from 'src/app/core/store/service/session-state.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  selectedWeapon: Weapon = null
  selectedRussianCity: RussianCity = null
  realtimeAttacks$: Observable<Attack> = null

  notificationMessage: string = null 

  constructor(
    private starterGame: GameStarterService, 
    private game: GameService,
    private sessionState: SessionStateService,
    private ukraineArmyService: UkraineArmyService,
    private attackService: AttackService,
    private attackState: AttackStateService,
    private rankingService: RankingService
  ) { }
 

  ngOnInit(): void {

    //this.starterGame.loadRussianCountries()
    this.game.loadRussianCities()
    // set source realtime subscription
    this.realtimeAttacks$ = this.attackService.getRealtimeAttacks()
    // subscribe source 
    this.realtimeAttacks$.subscribe(a => console.log(`new attack`, a))
    // save on attack8
    const saveAttackOnAppState$ = this.saveAttackOnAppState(this.realtimeAttacks$);
    // calculate ranking
    const calculateSoldierRanking$ = this.calculateSoldierRanking(saveAttackOnAppState$)
    calculateSoldierRanking$.subscribe(ranking => this.rankingService.saveSoldierRanking(ranking))
    // notify attack 
    const notifyAttack$ = this.notifyAttack(this.realtimeAttacks$)
    notifyAttack$.subscribe(message => this.notificationMessage = message)
    
  }

  notifyAttack(attack$: Observable<Attack>) {
    return attack$.pipe(
      map(attack => `${attack.soldier.name} ha atacado sin misericordia la ciudad de ${attack.city.name} Putin se esta inquietando`),
    )
  }

  saveAttackOnAppState(attack$: Observable<Attack>) {
    return attack$.pipe(
      tap(attack => this.attackState.save(attack))
    )
  }

  calculateSoldierRanking(attack$: Observable<Attack>) {
    return attack$.pipe(
      filter(attack => attack !== null),
      map(attack => attack.soldier.id),
      map(soldierId => this.attackState.getBySoldier(soldierId)),
      map(attacks => calculateSoldierRanking(attacks))
    )
  }

  takeRandomWeapon(weapon: Weapon) {
    this.selectedWeapon = weapon
  }

  destroyCity(russianCity: RussianCity) {
    this.selectedRussianCity = russianCity
    this.ukraineArmyService.attackRussianCity({
      soldier: this.sessionState.getSoldier(),
      city: this.selectedRussianCity,
      weapon: this.selectedWeapon
    })
    this.selectedRussianCity = null
    this.selectedWeapon = null
  }


}
