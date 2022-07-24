import { Inject, Injectable } from '@angular/core';
import { DOCUMENT_SERVICE } from '../../app.module';
import { Soldier } from '../../core/domain/model/Soldier';
import { DocumentProvider } from './providers/document.provider';

@Injectable({
  providedIn: 'root'
})
export class SoldierService {

  constructor(@Inject(DOCUMENT_SERVICE) private firebase: DocumentProvider) { }

  exists(name: string) {
    return this.firebase.existsDocument('soldiers', name)
  }

  saveSoldier(soldier: Soldier) {
    return this.firebase.saveDocument('soldiers', soldier)
  }
}
