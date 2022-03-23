import { Injectable } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { filter,  Observable,  } from 'rxjs';
import { Attack } from '../../domain/model/Attack';
import { FirebaseClientService } from './firebase-client.service';

@Injectable({
  providedIn: 'root'
})
export class AttackService {

  constructor(private firebaseClient: FirebaseClientService) { }

  saveAttack(attack: Attack): Observable<Attack> {
    return this.firebaseClient.saveDocument('attacks', attack)
  }

  getRealtimeAttacks(): Observable<Attack> {
    
    const adapter = (data: DocumentData): Attack => ({ 
      id: data['id'],
      datetime: data['datetime'],
      soldier: data['soldier'], 
      city: data['city'], 
      weapon: data['weapon']
    })

    return this.firebaseClient.onDocumentAdded('attacks', adapter).pipe(
      filter(attack => attack.soldier !== null)
    )

  }

}
