import { Inject, Injectable } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { filter, Observable } from 'rxjs';
import { DOCUMENT_SERVICE } from '../../app.module';
import { createAttack } from '../../core/application/createAttack';
import { Attack } from '../../core/domain/model/Attack';
import { AttackRequestDTO } from '../../core/dto/AttackRequestDTO';
import { AttackStore } from '../state/attack.store';
import { DocumentProvider } from './providers/document.provider';

@Injectable({
  providedIn: 'root'
})
export class AttackService {

  constructor(@Inject(DOCUMENT_SERVICE) private firebaseClient: DocumentProvider, private store: AttackStore) { }

  sendAttack(attackRequest: AttackRequestDTO){
    return this.firebaseClient.saveDocument('attacks', createAttack(attackRequest))
  }

  saveAttackOnState(attack: Attack) {
    this.store.add(attack, { prepend: true})
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
