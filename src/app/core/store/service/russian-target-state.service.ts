import { Injectable } from '@angular/core';
import { RussianTarget } from '../../domain/model/RussianTarget';
import { RussianTargetQuery } from '../russian-target/russian-target.query';
import { RussianTargetStore } from '../russian-target/russian-target.store';

@Injectable({
  providedIn: 'root'
})
export class RussianTargetStateService {

  constructor(private store: RussianTargetStore, private query: RussianTargetQuery) { }

  saveAll(russiantargets: RussianTarget[]) {
    this.store.set(russiantargets)
  }

  selectAll() {
    return this.query.selectAll()
  }

}
