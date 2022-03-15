import { TestBed } from '@angular/core/testing';

import { SoldierPlayerService } from './soldier-player.service';

describe('SoldierPlayerService', () => {
  let service: SoldierPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoldierPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
