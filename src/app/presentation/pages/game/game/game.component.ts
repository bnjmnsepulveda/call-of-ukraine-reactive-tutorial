import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { AttackService } from 'src/app/core/application/service/attack.service';
import { RussianCityService } from 'src/app/core/application/service/russian-city.service';
import { RankingService } from 'src/app/core/application/service/soldier-ranking.service';
import { UkraineArmyService } from 'src/app/core/application/service/ukraine-army.service';
import { Attack } from 'src/app/core/domain/model/Attack';
import { RussianCity } from 'src/app/core/domain/model/RussianCity';
import { Weapon } from 'src/app/core/domain/model/Weapon';
import { calculateSoldierRanking } from 'src/app/core/domain/service/calculateSoldierRanking';
import { getRussianCities } from 'src/app/core/domain/service/getRussianCities';
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
    private sessionState: SessionStateService,
    private ukraineArmyService: UkraineArmyService,
    private russianCityService: RussianCityService,
    private attackService: AttackService,
    private attackState: AttackStateService,
    private rankingService: RankingService
  ) { }
 

  ngOnInit(): void {
    // load russian cities
    this.russianCityService.setRussianCities(getRussianCities())
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
