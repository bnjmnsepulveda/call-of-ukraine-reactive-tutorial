import { TestBed } from '@angular/core/testing';
import { lastValueFrom } from 'rxjs';
import { Soldier } from 'src/app/core/domain/model/Soldier';

import { SoldierService } from './soldier.service';

describe('SoldierPlayerService', () => {
  let service: SoldierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoldierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be a player created', async () => {
    const soldierPlayer = {
      id: 'a',
      name: 'benjamin'
    } as Soldier
    const result = await lastValueFrom(service.add(soldierPlayer))
    expect(result).toBeDefined()

  });
});
