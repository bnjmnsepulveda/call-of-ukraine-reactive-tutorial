import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Resource } from '../../core/domain/model/Resource';

export interface RussiaDestructionState {
  targets: string[];
  damage: Resource;
}

@Injectable({ 
    providedIn: 'root' 
})
@StoreConfig({ 
  name: 'russia-destruction' 
})
export class RussiaDestructionStore extends Store<RussiaDestructionState> {
  constructor() {
    super({
      targets: [],
      damage: {
        civilians: 0,
        buildings: 0,
        soldiers: 0,
        tanks: 0,
        trucks:0,
        warplanes: 0,
        warships: 0
      }
    });
  }
}