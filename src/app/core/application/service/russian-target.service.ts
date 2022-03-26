import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RussianTarget } from '../../domain/model/RussianTarget';
import { RussianTargetStateService } from '../../store/service/russian-target-state.service';

@Injectable({
  providedIn: 'root'
})
export class RussianTargetService {

  constructor(private state: RussianTargetStateService) { }

  setRussianTargets(russianTargets: RussianTarget[]) {
    this.state.saveAll(russianTargets)
  }

  getInputSelectData(): Observable<Pick<RussianTarget, 'id' | 'name' | 'city'>[]> {
    return this.state.selectAll()
  }
}
