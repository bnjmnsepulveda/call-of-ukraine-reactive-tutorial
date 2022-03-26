import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { RussianTarget } from '../../domain/model/RussianTarget';

export interface RussianTargetState extends EntityState<RussianTarget> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'russian-target' })
export class RussianTargetStore extends EntityStore<RussianTargetState> {

  constructor() {
    super();
  }

}
