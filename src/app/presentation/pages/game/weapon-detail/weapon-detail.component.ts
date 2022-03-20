import { Component, Input, OnInit } from '@angular/core';
import { Weapon } from 'src/app/core/domain/model/Weapon';

@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: ['./weapon-detail.component.css']
})
export class WeaponDetailComponent implements OnInit {

  @Input() weapon: Weapon

  constructor() { }

  ngOnInit(): void {
  }

}
