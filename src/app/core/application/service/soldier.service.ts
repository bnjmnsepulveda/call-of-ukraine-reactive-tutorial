import { Injectable } from '@angular/core';
import { Soldier } from '../../domain/model/Soldier';
import { FirebaseClientService } from './firebase-client.service';

@Injectable({
  providedIn: 'root'
})
export class SoldierService {

  constructor(private firebase: FirebaseClientService) { }

  exists(name: string) {
    return this.firebase.existsDocument('soldiers', name)
  }

  saveSoldier(soldier: Soldier) {
    return this.firebase.saveDocument('soldiers', soldier)
  }
}
