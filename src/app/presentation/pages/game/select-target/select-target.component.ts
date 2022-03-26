import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RussianTarget } from 'src/app/core/domain/model/RussianTarget';
import { getRussianTargets } from 'src/app/core/domain/service/getRussianTargets';

@Component({
  selector: 'app-select-target',
  templateUrl: './select-target.component.html',
  styleUrls: ['./select-target.component.css']
})
export class SelectTargetComponent implements OnInit {

  formGroup: FormGroup;
  russianTarget = new FormControl(null)
  russianTargets: RussianTarget[] = getRussianTargets()
  @Output() 
  russianTargetChange: EventEmitter<RussianTarget> = new EventEmitter<RussianTarget>();
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      russianTarget: [null]
    })
  }

  submit(){
    this.russianTargetChange.emit(this.formGroup.value.russianTarget)
  }

}
