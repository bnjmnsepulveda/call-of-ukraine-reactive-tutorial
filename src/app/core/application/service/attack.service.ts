import { Inject, Injectable } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { filter, Observable } from 'rxjs';
import { DOCUMENT_SERVICE } from '../../../app.module';
import { Attack } from '../../domain/model/Attack';
import { DocumentProvider } from '../providers/document.provider';

@Injectable({
  providedIn: 'root'
})
export class AttackService {

  constructor(@Inject(DOCUMENT_SERVICE) private firebaseClient: DocumentProvider) { }

  saveAttack(attack: Attack): Observable<Attack> {
    return this.firebaseClient.saveDocument('attacks', attack)
  }

  getRealtimeAttacks(): Observable<Attack> {
    
    const adapter = (data: DocumentData): Attack => ({ 
      id: data['id'],
      russianTarget: data['russianTarget'],
      datetime: data['datetime'],
      soldier: data['soldier'], 
      weapon: data['weapon']
    })

    return this.firebaseClient.onDocumentAdded('attacks', adapter).pipe(
      filter(attack => attack.soldier !== null)
    )

  }

}
